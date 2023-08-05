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
import axios from 'axios';
import { useState } from 'react';
import { toast,Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useUserContext } from '../../../../context/userContext';
export default function login() {
 
  const [data,setdata] = useState({
    email:"",
    password:""
  })
  const { email, password } = data;
  const router = useRouter();
  const { storeUser, userSave } = useUserContext();
  const validateForm = () => {

    const newErrors = {
      email: "",
      password: "",
    };

    let formIsValid = true;

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
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formIsValid = validateForm();
    if (!formIsValid) {
      return;
    }
    try {
      const result = await  axios.post('http://localhost:5000/api/v1/login',data)
      if (result.data.success) {
        localStorage.setItem('user', JSON.stringify(result.data.data));
        localStorage.setItem('userId', JSON.stringify(result.data.data.id));
        storeUser(result.data.data)
        userSave(result.data.data.id)
        toast.success(result.data.message, { duration: 5000 })
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message ?? "An error occurred", { duration: 5000 })
    }
  };

  return (
    <>
      <Grid container component="main" sx={{ height: 'full' }}>
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
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                onChange={dataChange}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={data.password}
                onChange={dataChange}
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
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