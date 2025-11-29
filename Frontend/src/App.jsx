import './App.css'
import { useEffect, useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Home from './pages/Home'
import Playlist from './pages/Playlist'
import Layout from './pages/Layout'

function App() {

  const routerObject = createBrowserRouter(
    createRoutesFromElements(
      <>
          <Route path='/' element={<Layout/>}>
              <Route path='' element={<Home/>} />
              <Route path='playlists' element={<Playlist/>} />
          </Route>
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
