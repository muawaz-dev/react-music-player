import './App.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider,Route } from 'react-router-dom'
import Home from './pages/Home'
import Playlist from './pages/Playlist'

function App() {
  const routerObject = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home/>}  />
        <Route path="/playlist" element={<Playlist/>}/>
      </>
    )
  )
  
  return (
    <>
      <RouterProvider router={routerObject} />
    </>
  )
}

export default App
