import LoginModal from './component/login/LoginModal'
import RegisterModal from './component/register/RegisterModal'

function App() {
  return (
    <div className='bg-[#D9D9D9] flex border-2 gap-4 border-black'>
        <div className='mt-4 ml-4'><LoginModal /></div>
        <div className='mt-4 ml-4'><RegisterModal /></div>
    </div>
  )
}

export default App
