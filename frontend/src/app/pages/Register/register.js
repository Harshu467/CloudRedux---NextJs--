import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {Toaster,toast} from 'react-hot-toast';
import axios from 'axios'
import { useRouter } from 'next/router';

export default function Register() {
  const [data,setdata] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })
  const router = useRouter();
  const { firstName, lastName, email, password } = data;
  const validateForm = () => {

    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };

    let formIsValid = true;

    if (!firstName) {
      newErrors.firstName = "First Name is required";
      toast.error(newErrors.firstName)
      formIsValid = false;
    }

    if (!lastName) {
      newErrors.lastName = "Last Name is required";
      toast.error(newErrors.lastName)
      formIsValid = false;
    }

    if (!email) {
      newErrors.email = "Email is required";
      toast.error(newErrors.email);
      formIsValid = false;

    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      toast.error(newErrors.email)
      formIsValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      toast.error(newErrors.password)
      formIsValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password should be at least 6 characters long";
      toast.error(newErrors.password)
      formIsValid = false;
    }

    return formIsValid;
  };
  const dataChange = (event) => {
    const newData = { ...data, [event.target.name]: event.target.value };
    setdata(newData);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handle Submit")
    const formIsValid = validateForm();
    if (!formIsValid) {
      return;
    }
    try {
      const result = await axios.post('http://localhost:5000/api/v1/register',data)
      if (result.data.success) {
        // dispatch(registerUser(result.data.data));
        router.replace('/login');
        toast.success(result.data.message, { duration: 5000 })
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message ?? "An error occurred", { duration: 5000 })
    }
  }


  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" noValidate   sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  onChange={dataChange}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  onChange={dataChange}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={dataChange}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={dataChange}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                style={{backgroundColor:"blue",color:"white"}}
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Toaster
        position="top-right"
        reverseOrder={false}
      />
      </Grid>
      </>
  );
}