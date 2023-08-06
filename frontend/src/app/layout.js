import { UserProvider } from 'context/userContext'
import Footer from '../../components/Footer/Footer'
import NavBar from '../../components/NavBar/NavBar'
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
      <NavBar/>
      {children}
      <Footer/>
    </UserProvider>
    </>
  )
}
