import Header from './components/Header'
import { Outlet } from 'react-router-dom'

import './App.css'
import {ThemeProvider } from './contexts/ThemeContext'

const App = () => {
  
  return (
    // Here i set themeContext provider in all file , and set the isdark or setisdark value in thus and remove the values from header and outlet
    // Hmne sari values ko ThemeContext.js me dal dia or yha ThemeProvider call kr dia bss
    <ThemeProvider>  
      <Header/>
      <Outlet/>
    </ThemeProvider>
  )
}

export default App
