import { Routes, Route } from 'react-router-dom'
import { usePushContent } from './context/context'
import HorizontalNav from './component/navbar/HorizontalNav'
import Posts from './component/posts/Posts'
import Redirect from './Redirect'
import CreatePostModal from './component/posts/CreatePostModal'
function App() {

  const { push } = usePushContent()

  return (
    <div className='h-screen w-screen pt-[30px] px-[30px] flex flex-col'>
          <HorizontalNav />
          <div className='flex-1 flex overflow-scroll'>
              <div className={`w-[${push}] ${push ? "w-[100px]" : "w-0"} transition-[width] ease-linear delay-[50ms]`} />
              <Routes>
                  <Route path='/' element={<Redirect />}/>
                  <Route path='/posts' element={<Posts />}/>
                  <Route path='/posts/:postId' element={<CreatePostModal />}/>
              </Routes>  
          </div>
      </div>
  )
}

export default App
