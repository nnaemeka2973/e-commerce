import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <Header />
    {children}
    <Footer></Footer>
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=''
      toastOptions={{
        style: {
          background: "black",
          color: "white",
        }
      }

      }

   />
  
    
    </>
  )
}

export default Layout