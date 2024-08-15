import {  useState } from "react"
import logo from "../../assets/logo.svg"
import { usePushContent } from "../../context/context"

function VerticalNav() {
  const [VerticalBar, setVerticalBar] = useState(false)
  const { setPush } = usePushContent()

  return (
    <div className={`flex flex-col overflow-hidden transition-[height,hover,width] ease-linear${VerticalBar ? "bg-[#828282]" : "bg-white"} relative z-10 hover:cursor-pointer delay-75 ${!VerticalBar ? "w-[80px]" : "w-[250px]"}  ${VerticalBar ? "bg-[#828282]" : "bg-white"} relative z-10 hover:cursor-pointer delay-75 ${!VerticalBar ? "h-[80px]" : "h-[calc(100vh-64px)]"} w-[80px] p-[15px] mr-[30px] hover:bg-[#828282]`} >
      <img className="mr-[30px] mb-[30px] w-[80px] h-[80px]" src={logo} onClick={() => {
      if (VerticalBar) {
        setVerticalBar(false)
        setPush(false)
      } else {
        setVerticalBar(true)
        setPush(true)
      }
    }}/>
      <div>Create Post</div>
      <div>Login</div>
      <div>Register</div>
      <div>Browse</div>
    </div>
  )
}

export default VerticalNav