import { UserProvider } from 'context/userContext'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/NavBar/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'Virtual Event Management System',
  description: 'Virtual Event Management System',
}

export default function RootLayout({ children }) {
  return (
    <>
    <UserProvider>
      <Navbar/>
      {children}
      <Footer/>
    </UserProvider>
    </>
  )
}
