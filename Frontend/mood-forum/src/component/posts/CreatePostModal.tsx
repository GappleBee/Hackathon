import { useForm, SubmitHandler } from 'react-hook-form'

function CreatePostModal() {

    const createPost = () => {
        console.log("post created`")
    }

  return (
    <div className='border-2 absolute border-orange-400 w-screen h-screen top-0 left-0 z-40 flex justify-center items-center'>
        <div className="w-full h-full bg-slate-600 absolute opacity-50"></div>
        <form className="border-2 rounded-[8px] w-[535px] h-[60%] bg-white gap-4 z-50 p-[32px] flex flex-col justify-evenly">
            <div className="font-poppins text-[32px] font-[600]">Create Post</div>
            <input type="text" placeholder="Title..." className="border-2 font-poppins rounded-[8px] w-full outline-none h-[10%] px-[16px]"/>
            <textarea className="border-2 w-full h-[70%] outline-none resize-none p-[16px] rounded-[8px] font-poppins"/>
            <div className="flex justify-around h-[12%]">
                <button type="button" className="border-2 w-[175px] h-[56px] rounded-[8px] font-poppins hover:bg-[#D9D9D9] hover:bg-opacity-25 font-[600]">Cancel</button>
                <button type="button" className="border-2 w-[175px] h-[56px]  hover:bg-[#CFDD63] font-poppins bg-[#E2F266] rounded-[8px] font-[600]">Create</button>
            </div>
        </form>
    </div>
  )
}

export default CreatePostModal