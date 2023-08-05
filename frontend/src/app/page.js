'use client';
import React from 'react';
import {UserProvider} from '../../context/userContext'

export default function Home({Component, pageProps}) {
  return (
    <>
    <UserProvider>
    <Component {...pageProps}/>
    </UserProvider>
    </>
  )
}
