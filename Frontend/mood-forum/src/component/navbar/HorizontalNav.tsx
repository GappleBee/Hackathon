import search from "../../assets/search.svg"
import bell from "../../assets/bell.svg"
import VerticalNav from "./VerticalNav"


function HorizontalNav() {


  return (
    <div className="h-[80px] flex w-full mb-[30px]">
      
      <VerticalNav />
      
      <div className="w-full h-[80px] flex items-center justify-between">
        <div className="border-[1px] pl-[10px] border-[#828282] w-[400px] h-[52px] rounded-[30px] flex items-center">
          <img src={search} className="w-[45px] h-[38px]" />
          <div className="w-[320px] flex">
            <input type="text" placeholder="Search..." className=" h-[24px] flex-1 outline-none"/>
          </div>
        </div>

        <div className="flex justify-center items-center mr-[16px]">
          <div className="w-[239px] h-[52px] py-[7px] px-[10px] rounded-[30px] flex items-center border-[1px] border-[#828282]">
            <div className="h-[38px] w-[45px] rounded-[20px] flex justify-center items-center bg-[#828282] mr-[15px]">
              <img className="h-[30px] w-[30px]" src={bell} />
            </div>
            <span className="w-[114px] font-poppins text-[18px] leading-[24px] font-[500] text-[#828282] mr-[15px]">Notifications</span>
            <div className="h-[30px] w-[30px] rounded-full flex justify-center items-center bg-[#828282]">
                <span className="text-white">5</span>
            </div>
          </div>

          <div className="h-[64px] w-[64px] flex justify-center items-center ml-[30px]">
            <div className="bg-[#828282] rounded-full h-full w-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HorizontalNav