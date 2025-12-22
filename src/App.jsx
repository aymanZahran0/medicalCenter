import { useState } from 'react'
import './App.css'
import routers from './routes/Routers'
import { RouterProvider} from 'react-router-dom';


function App() {


  return (
    <>
     <RouterProvider router ={routers}/>
    </>
  )
}

export default App
