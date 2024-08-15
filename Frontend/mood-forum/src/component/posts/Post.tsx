
import { useNavigate } from "react-router-dom"
function Post({ title, username, content, id } : { title: string, content: string, username: string, id: number }) {
  const navigate = useNavigate()
  return (
    <div className="bg-[#969FA5] hover:cursor-pointer hover:border-2 hover:border-orange-400 flex flex-col max-w-[400px] rounded-[12px] max-h-[250px] min-h-[200px] overflow-hidden" onClick={() => {
      navigate(`/posts/${id}`)
    }}>
        <div className="flex bg-[#B8BABB] gap-[12px] p-[13px] items-center rounded-t-[12px]">
          <div className="w-[50px] h-[50px] bg-black rounded-[8px]"></div>
          <div>
            <h1 className="underline">{title}</h1>
            <span>@{username}</span>
          </div>
        </div>
        <div className="bg-[#969FA5] p-[13px] h-[65%] overflow-hidden rounded-b-[12px]">
            {content}
        </div>
    </div>
  )
}

export default Post