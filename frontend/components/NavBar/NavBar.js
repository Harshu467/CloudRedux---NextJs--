import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useUserContext } from '../../context/userContext';
import { Toaster,toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const { user, logoutUser, id } = useUserContext();
  const router = useRouter();
  const handleLogout = () => {
    logoutUser();
    router.replace('/home');
  };
  const handleAddEventClick = () => {
    if (!id) {
      toast.error('You need to login to create events');
    }
  };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: '0 2rem',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box>
        <Link href="/home" passHref>
          <Button  color="primary" variant="text" sx={{ marginRight: '2rem', fontSize: '1.2rem' }}>
            Home
          </Button>
        </Link>
        <Link href="/dashboard" passHref>
          <Button  color="primary" variant="text" sx={{ marginRight: '2rem', fontSize: '1.2rem' }}>
            Dashboard
          </Button>
        </Link>
        {id ? (
          <Link href={`/createEvent/${id}`} passHref>
            <Button color="primary" variant="text" sx={{ fontSize: '1.2rem' }}>
              Add Events
            </Button>
          </Link>
        ) : (
          <Button color="primary" onClick={handleAddEventClick} variant="text" sx={{ fontSize: '1.2rem' }}>
            Add Events
          </Button>
        )}
        
      </Box>

      <Box className="actions-right" sx={{ display: 'flex', alignItems: 'center' }}>
        {user ? (
          <>
            <Link href={`/profile/${id}`} passHref>
              <Button  color="success" variant="contained" style={{backgroundColor: 'green', color: 'white'}}  sx={{ marginRight: '1rem' }}>
                Profile
              </Button>
            </Link>
            <Button onClick={handleLogout} style={{backgroundColor: 'red', color: 'white'}} color="error" variant="contained">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" passHref>
              <Button  color="primary" variant="contained" style={{backgroundColor: 'blue', color: 'white'}} sx={{ marginRight: '1rem' }}>
                Login
              </Button>
            </Link>
            <Link href="/register" passHref>
              <Button  color="info"  style={{backgroundColor: 'blue', color: 'white'}} variant="contained">
                Register
              </Button>
            </Link>
          </>
        )}
      </Box>

    </Box>
  );
};

export default NavBar;
