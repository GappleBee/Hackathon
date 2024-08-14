import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App.tsx'
import HorizontalNav from './component/navbar/HorizontalNav.tsx';

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className='h-screen w-screen pt-[30px] px-[30px] flex flex-col'>
        <HorizontalNav />
        <div className='border-4 border-black flex-1 '>
          <Routes>
              <Route path='/' element={<App />}/>
              <Route path='/posts' element={<h1>posts</h1>}/>
              <Route path='/posts/:postId' element={<h1>posts id</h1>}/>
              <Route path='/profile' element={<h1>profile</h1>}/>
          </Routes>  
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
