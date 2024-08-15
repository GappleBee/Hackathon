import { Routes, Route } from 'react-router-dom'
import HorizontalNav from './component/navbar/HorizontalNav'
import { usePushContent } from './context/context'

function App() {

  const { push } = usePushContent()

  return (
    <div className='h-screen w-screen pt-[30px] px-[30px] flex flex-col'>
          <HorizontalNav />
          <div className='border-4 border-black flex-1 flex'>
              <div className={`w-[${push}] ${push ? "w-[120px]" : "w-0"} transition-[width] ease-linear delay-[50ms]`} />
              <Routes>
                  <Route path='/' element={<App />}/>
                  <Route path='/posts' element={<h1>posts</h1>}/>
                  <Route path='/posts/:postId' element={<h1>posts id</h1>}/>
                  <Route path='/profile' element={<h1>profile</h1>}/>
              </Routes>  
          </div>
      </div>
  )
}

export default App
