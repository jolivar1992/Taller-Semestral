import React, { useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import MaterialDatatable from "material-datatable";

const moment = require('moment')

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  
  },
  delete : {
    backgroundColor:"red"
  }

}));

export default function Prestamo() {
  const classes = useStyles();

  const { register, handleSubmit, errors,getValues,setValue,reset } = useForm(
    {defaultValues:{Id_Libro:"Id Libro *",Id_Persona:"Id Persona *",fecha:moment().format('DD/MM/YYYY')}});
  

  const [personas, setPersonas] = useState([])
  const [libros, setLibros] = useState([])

  const [idLibro,setIdLibro] = useState(null);
  const [idPersona,setIdPersona] = useState(null);
  
  useEffect(() => {
    cargarLibro();
    cargarPersona();
  }, []);



  const seleccionar = (item) =>{
  
    setValue("idLibro",item._id)
    setIdLibro(item._id)    
  }

  const seleccionarPersona = (itemPersona) =>{
    setValue("idPersona",itemPersona._id)
    setIdPersona(itemPersona._id)    
  }


  const columnsLibros = [
    {
      name: "Seleccionar",
      options: {
        headerNoWrap: true,
        customBodyRender: (item, tablemeta, update) => {
          return (
            <Button
              variant="contained"
              className="btn-block"
              onClick={() => seleccionar(item)}
            >
              Seleccionar
            </Button>
          );
        },
      },
    },
    {
      name: 'Nombre',
      field: 'nombre'
    },
    {
      name: 'Codigo',
      field: 'codigo'
    },
    {
        name: 'idLibro',
        field: '_id'
      }
    
  ];

  const columnsPersonas = [
    {
      name: "Seleccionar",
      options: {
        headerNoWrap: true,
        customBodyRender: (itemPersona, tablemeta, update) => {
          return (
            <Button
              variant="contained"
              className="btn-block"
              onClick={() => seleccionarPersona(itemPersona)}
            >
              Seleccionar
            </Button>
          );
        },
      },
    },
    {
      name: 'Nombre',
      field: 'nombre'
    },
    {
      name: 'Rut',
      field: 'rut'
    },
    {
        name: 'idPersona',
        field: '_id'
      }
  
    
  ];

  const options={
    selectableRows: false,
    print: false,
    onlyOneRowCanBeSelected: false,
    textLabels: {
      body: {
        noMatch: "Lo sentimos, no se encuentran registros",
        toolTip: "Sort",
      },
      pagination: {
        next: "Siguiente",
        previous: "Página Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
    },
    download: false,
    pagination: true,
    rowsPerPage: 5,
    usePaperPlaceholder: true,
    rowsPerPageOptions: [5, 10, 25],
    sortColumnDirection: "desc",
  }

  const onSubmit = data => {

    axios
    .post("http://localhost:9000/api/prestamo", {
        
    
        idPersona:data.idPersona,
        libro:data.idLibro,
        fecha:moment().format('YYYY,MM,DD')

    })
    .then(
      (response) => {
        if (response.status == 200) {
          alert("Registro ok")
          reset();
        }
      },
      (error) => {
        // Swal.fire(
        //   "Error",
        //   "No es posible realizar esta acción: " + error.message,
        //   "error"
        // );
      }
    )
    .catch((error) => {
      // Swal.fire(
      //   "Error",
      //   "No cuenta con los permisos suficientes para realizar esta acción",
      //   "error"
      // );
      console.log(error);
    });

}
  const cargarPersona = async () => {
    // const { data } = await axios.get('/api/zona/listar');

    const { data } = await axios.get("http://localhost:9000/api/personas");
    
    setPersonas(data.persona);

  };

  const cargarLibro = async () => {
    // const { data } = await axios.get('/api/zona/listar');

    const { data } = await axios.get("http://localhost:9000/api/librosimple");
    
    setLibros(data.libroBusqueda);

  };


  
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
      <Button
            type="button"
            fullWidth
            variant="contained"
        
            className={classes.submit}
            onClick = {()=>{reset();setIdPersona(null);setIdLibro(null)}}
          >
          Nuevo
          </Button>

        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="idLibro"
                name="idLibro"
                variant="outlined"
                required
                fullWidth
                id="idLibro"
                label="ID Libro"
                autoFocus
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="idPersona"
                label="ID Persona"
                name="idPersona"
                autoComplete="idPersona"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="fecha"
                label="Fecha"
                name="fecha"
                autoComplete="fecha"
                inputRef={register}
              />
            </Grid>


          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Guardar
          </Button>

          <Grid container spacing={1}>
            <MaterialDatatable
        
              title={"Libros"}
              data={libros}
              columns={columnsLibros}
              options={options}
            />
          </Grid>

          <Grid container spacing={1}>
            <MaterialDatatable
        
              title={"Personas"}
              data={personas}
              columns={columnsPersonas}
              options={options}
            />
          </Grid>
  
        
        </form>


      </div>

    </Container>
  );
}
