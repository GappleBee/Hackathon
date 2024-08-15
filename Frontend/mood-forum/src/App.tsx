import { Routes, Route } from 'react-router-dom'
import { usePushContent } from './context/context'
import HorizontalNav from './component/navbar/HorizontalNav'
import Posts from './component/posts/Posts'

function App() {

  const { push } = usePushContent()

  return (
    <div className='h-screen w-screen pt-[30px] px-[30px] flex flex-col'>
          <HorizontalNav />
          <div className='flex-1 flex overflow-scroll'>
              <div className={`w-[${push}] ${push ? "w-[244px]" : "w-0"} transition-[width] ease-linear delay-[50ms]`} />
              <Routes>
                  <Route path='/' element={<App />}/>
                  <Route path='/posts' element={<Posts />}/>
                  <Route path='/posts/:postId' element={<h1>posts id</h1>}/>
                  <Route path='/profile' element={<h1>profile</h1>}/>
              </Routes>  
          </div>
      </div>
  )
}

export default App
