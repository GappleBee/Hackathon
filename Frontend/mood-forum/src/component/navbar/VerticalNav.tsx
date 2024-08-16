import {  useState } from "react"
import logo from "../../assets/logo.svg"
import { usePushContent } from "../../context/context"
import { LogOutIcon } from "lucide-react"
import { ScrollText } from "lucide-react"
import { BookCopy } from "lucide-react"
import axios from "axios"
import { userData } from "../posts/Posts"
import { useNavigate } from "react-router-dom"

function VerticalNav() {
  const [VerticalBar, setVerticalBar] = useState(false)
  const { setPush } = usePushContent()
  const navigate = useNavigate()

  const handleLogout = () => {
    console.log("logut")
    const isLogged = sessionStorage.getItem("logged")
    const data: userData = isLogged ? JSON.parse(isLogged) : null
    const token = data.token
    axios.post(`http://localhost:8000/api/logout`, {}, {headers: {
      'Authorization': `Token ${token}`
    }}).then((response) => {
      console.log(response)
      sessionStorage.clear()
      window.location.reload()
    })
  }

  return (
    <div className={`flex flex-col overflow-hidden transition-[height,hover,width] ease-linear${VerticalBar ? "bg-[#828282]" : "bg-white"} relative z-10 delay-75 ${!VerticalBar ? "w-[80px]" : "w-[250px]"}  ${VerticalBar ? "bg-[#828282]" : "bg-white"} relative z-10 delay-75 ${!VerticalBar ? "h-[80px]" : "h-[calc(100vh-64px)]"} w-[80px] p-[15px] mr-[30px] hover:bg-[#828282]`} >
      <img className="mr-[30px] mb-[30px] w-[80px] h-[80px] hover:cursor-pointer" src={logo} onClick={() => {
      if (VerticalBar) {
        setVerticalBar(false)
        setPush(false)
      } else {
        setVerticalBar(true)
        setPush(true)
      }
    }}/>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col justify-center items-center">
          <div className="w-[50px] h-[50px] flex justify-center items-center hover:cursor-pointer"><ScrollText size={32}/></div>
          <div className="w-[50px] h-[50px] flex justify-center items-center hover:cursor-pointer" onClick={() => navigate("/posts")}><BookCopy size={32}/></div>
        </div>
      <div className="w-[50px] h-[50px] flex justify-center items-center hover:cursor-pointer" onClick={handleLogout} ><LogOutIcon size={32} /></div>
      </div>
    </div>
  )
}

export default VerticalNav