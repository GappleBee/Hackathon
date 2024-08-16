import { useForm, SubmitHandler } from 'react-hook-form'
function CreatePostModal() {

    type PostFields = {
        title: string,
        content: string,
    }

    const TitleValidate = {
        required: "title is required!"
    }

    const createPost:SubmitHandler<PostFields> = (data:PostFields) => {
        console.log("post created`", data)
    }
    
    const { 
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<PostFields>()

  return (
    <div className='border-2 absolute border-orange-400 w-screen h-screen top-0 left-0 z-40 flex justify-center items-center'>
        <div className="w-full h-full bg-slate-600 absolute opacity-50"></div>
        <form onSubmit={handleSubmit(createPost)} className="border-2 rounded-[8px] w-[535px] h-[60%] bg-white gap-2 z-50 p-[32px] flex flex-col justify-evenly">
            <div className="font-poppins text-[32px] font-[600]">Create Post</div>
            <input {...register("title", TitleValidate)} type="text" placeholder="Title..." className="border-2 font-poppins rounded-[8px] w-full outline-none h-[10%] px-[16px]"/>
            <span className="text-[14px] font-[400] leading-[24px] font-poppins text-[#F34735]">{ errors.title && (<span className='ml-4'>{ errors.title.message }</span>) }</span>
            <textarea {...register("content")} className="border-2 w-full h-[70%] outline-none resize-none p-[16px] rounded-[8px] font-poppins"/>
            <div className="flex justify-around h-[12%]">
                <button type="button" className="border-2 w-[175px] h-[56px] rounded-[8px] font-poppins hover:bg-[#D9D9D9] hover:bg-opacity-25 font-[600]">Cancel</button>
                <button type="submit" className="border-2 w-[175px] h-[56px]  hover:bg-[#CFDD63] font-poppins bg-[#E2F266] rounded-[8px] font-[600]">Create</button>
            </div>
        </form>
    </div>
  )
}

export default CreatePostModal