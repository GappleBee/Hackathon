import { useEffect, useState } from "react"
import Post from "./Post"
import LoginModal from "../login/LoginModal"
import RegisterModal from "../register/RegisterModal"

export type userData = {
  token : string,
  user: {
    id: number,
    username: string,
    email: string
  }
}

function Posts() {
  const [displaySignin, setDisplaySignIn] = useState(false)
  const [showRegister, setShowRegister] = useState(true)
  
  useEffect(() => {
    let isLogged = sessionStorage.getItem("logged")
    let data: userData = isLogged ? JSON.parse(isLogged) : null

    if (!isLogged || !data.token) {
      setDisplaySignIn(true)
    } else {
      setDisplaySignIn(false)
    }
  }, [])

  const posts = (<div className="flex flex-wrap gap-[24px] content-start overflow-scroll">
                  <Post title={"Hackathon"} username={"johnny"} id={1} content={
                        "This here is some content This teadsjlknasljkndkl asdaad snklashd asjd kasjhjd jkash djkash dkjashd kjashdkjas hdkjas hdjkashdjkawhduiahsk jdh jakscbnjkxasncikjdanfkjlahf lakerhrb gfjrgfhrgafg lyiuerwagfyiuew gfuyweGFHJLWEGFHUJGDHJGFEHWBCJNWDWGCYUWEB Ygeryfg EYGR KYUAGKWE lyewg rluyaug kuawgfe uyew"
                  }/>
                </div>)
  
  const signIn = (
    <div className="border-2 border-orange-500 absolute top-0 left-0 w-screen h-screen z-20 flex justify-center items-center">
        <div className="w-full h-full bg-slate-600 absolute opacity-50"></div>
        <div className="relative z-50">
          {showRegister ? <RegisterModal setShowRegister={setShowRegister}/> : <LoginModal setShowRegister={setShowRegister} />}
        </div>
    </div>
  )
  
  return (
        <>
          {displaySignin && signIn}
          {posts}
        </>
  )
}

export default Posts