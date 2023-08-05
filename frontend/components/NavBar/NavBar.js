import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useUserContext } from '../../context/userContext';
import { useRouter } from 'next/router';

const NavBar = () => {
  const { user, logoutUser,id } = useUserContext(); 
  const router = useRouter();
  const handlelogout = () => {
    logoutUser();
  };


  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: '0 1rem',
      }}
    >
      <Box>
        <div className="lg:flex-grow">
          <Link href="/home" className="mt-4 lg:inline-block lg:mt-0 text-black ml-[5rem]">
            Home
          </Link>
          <Link href="/dashboard" className="mt-4 lg:inline-block lg:mt-0 text-black mr-[8rem]">
            Dashboard
          </Link>
          <Link href={`/createEvent/${id}`} className="mt-4 lg:inline-block lg:mt-0 text-black mr-4">
            Add Events
          </Link>
        </div>
      </Box>

      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {user ? ( 
          <>
            <Button variant="contained" color='success' href={`/profile/${id}`} sx={{ margin: 2 }}>
              Profile
            </Button>
            <Button variant="contained"  onClick={handlelogout} style={{backgroundColor: 'blue', color: 'white'}} sx={{ margin: 2,  }}>
              Logout
            </Button>
          </>
        ) : ( 
          <>
            <Button variant="contained" href="/login" sx={{ margin: 2 }}>
              Login
            </Button>
            <Button variant="contained" href="/register" sx={{ margin: 1 }}>
              Register
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default NavBar;
