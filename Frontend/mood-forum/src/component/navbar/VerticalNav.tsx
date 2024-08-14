import { useState } from "react"
import logo from "../../assets/logo.svg"
function VerticalNav() {
  const [VerticalBarHeight, setVerticalBarHeight] = useState("80px")
  const [VerticalBarBG, setVerticalBarBG] = useState("bg-white")
  return (
    <div className={`transition-[height,hover] ease-linear ${VerticalBarBG} delay-75 h-[${VerticalBarHeight}] w-[80px] p-[15px] mr-[30px] hover:bg-[#828282] border-2 border-red-400`}>
        <img className="mr-[30px] w-[80px] hover:cursor-pointer" src={logo} onClick={() => {
          console.log(VerticalBarHeight)
          if (VerticalBarHeight === "80px") {
            setVerticalBarHeight("900px")
            setVerticalBarBG("bg-[#828282]")
          } else {
            setVerticalBarHeight("80px")
            setVerticalBarBG("bg-white")
          }
        }} />
    </div>
  )
}

export default VerticalNav