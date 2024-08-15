import {  useState } from "react"
import logo from "../../assets/logo.svg"
import { usePushContent } from "../../context/context"

function VerticalNav() {
  const [VerticalBar, setVerticalBar] = useState(false)
  const { setPush } = usePushContent()

  return (
    <div className={`transition-[height,hover] ease-linear ${VerticalBar ? "bg-white" : "bg-[#828282]"} relative z-10 hover:cursor-pointer delay-75 ${!VerticalBar ? "h-[80px]" : "h-[calc(100vh-64px)]"} w-[80px] p-[15px] mr-[30px] hover:bg-[#828282]`} onClick={() => {
      if (VerticalBar) {
        setVerticalBar(false)
        setPush(false)
      } else {
        setVerticalBar(true)
        setPush(true)
      }
    }} >
        <img className="mr-[30px] w-[80px]" src={logo} />
    </div>
  )
}

export default VerticalNav