import React from 'react'
import Header from './Header.js'
import Footer from './Footer.js'
import { Toaster } from 'react-hot-toast';

const Layout = (props) => {
  return (
    <div>
      <Header/>
      <main style={{minHeight:"90vh"}}>
         <Toaster/>
        {props.children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout;