import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

function LoginModal({setShowRegister} : {setShowRegister: Dispatch<SetStateAction<boolean>>}) {

  const [showPassword, setShowPassword] = useState("password")

  type LoginField = {
    username: string,
    password: string
  }

  const loginValidate = {
    required: "Please enter a username",
  }

  const passwordValidate = {
    required: "Please enter a password"
  }
  
  const { 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginField>()

  const onLogin: SubmitHandler<LoginField> = (data: LoginField) => {
    console.log(data)
    axios.post(`http://localhost:8000/api/login`, data).then((response) => {
        sessionStorage.setItem("logged", JSON.stringify(response.data))
        window.location.reload()
    })
  }

  const basilEye = 
  <svg onClick={() => {
    if (showPassword === "password") {
      setShowPassword("text")
    } else {
      setShowPassword("password")
    }
  }} className='hover:cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M20.5302 4.52997C20.6626 4.38779 20.7348 4.19975 20.7313 4.00545C20.7279 3.81114 20.6492 3.62576 20.5118 3.48835C20.3744 3.35093 20.189 3.27222 19.9947 3.26879C19.8004 3.26537 19.6123 3.33749 19.4702 3.46997L3.47015 19.47C3.39647 19.5386 3.33736 19.6214 3.29637 19.7134C3.25538 19.8054 3.23334 19.9047 3.23156 20.0054C3.22979 20.1061 3.24831 20.2062 3.28603 20.2996C3.32375 20.393 3.3799 20.4778 3.45112 20.549C3.52233 20.6202 3.60717 20.6764 3.70056 20.7141C3.79394 20.7518 3.89397 20.7703 3.99468 20.7686C4.09538 20.7668 4.19469 20.7447 4.28669 20.7038C4.37869 20.6628 4.46149 20.6037 4.53015 20.53L7.56515 17.495C8.88315 18.103 10.3922 18.5 12.0002 18.5C14.6182 18.5 16.9722 17.449 18.6682 16.147C19.5182 15.495 20.2152 14.771 20.7032 14.067C21.1832 13.375 21.5002 12.649 21.5002 12C21.5002 11.351 21.1832 10.625 20.7032 9.93397C20.2152 9.22897 19.5182 8.50497 18.6682 7.85397C18.3975 7.6453 18.1108 7.44497 17.8082 7.25297L20.5302 4.52997ZM15.1302 9.93197L14.0302 11.03C14.2307 11.4498 14.2961 11.9215 14.2174 12.3801C14.1387 12.8387 13.9198 13.2616 13.5908 13.5906C13.2618 13.9196 12.8389 14.1386 12.3803 14.2172C11.9217 14.2959 11.45 14.2305 11.0302 14.03L9.93015 15.13C10.6513 15.6074 11.5153 15.821 12.3758 15.7344C13.2363 15.6478 14.0405 15.2664 14.6521 14.6549C15.2636 14.0433 15.645 13.2392 15.7316 12.3786C15.8181 11.5181 15.6046 10.6541 15.1272 9.93297" fill="#575A5C"/>
    <path d="M12.67 8.31C12.7111 8.31771 12.7535 8.31537 12.7936 8.30318C12.8336 8.29099 12.8701 8.26932 12.9 8.24L14.85 6.29C14.8803 6.26019 14.9023 6.22294 14.9137 6.18198C14.9251 6.14102 14.9256 6.09779 14.915 6.05659C14.9045 6.0154 14.8834 5.97769 14.8537 5.94722C14.824 5.91676 14.7869 5.89462 14.746 5.883C13.8524 5.63094 12.9285 5.50209 12 5.5C9.382 5.5 7.028 6.551 5.332 7.853C4.482 8.505 3.785 9.229 3.296 9.933C2.816 10.625 2.5 11.351 2.5 12C2.5 12.649 2.817 13.375 3.296 14.066C3.77198 14.7338 4.33419 15.3357 4.968 15.856C5.01544 15.8952 5.07584 15.9152 5.13731 15.9121C5.19877 15.9089 5.25682 15.8828 5.3 15.839L8.24 12.899C8.26932 12.8691 8.29099 12.8326 8.30318 12.7926C8.31537 12.7525 8.31771 12.7101 8.31 12.669C8.27 12.4523 8.25 12.2293 8.25 12C8.24995 11.4508 8.37055 10.9082 8.60326 10.4107C8.83598 9.91325 9.17513 9.47295 9.59675 9.12097C10.0184 8.76898 10.5122 8.51391 11.0432 8.37378C11.5743 8.23364 12.1296 8.21187 12.67 8.31Z" fill="#575A5C"/>
  </svg>

  return (
    <form onSubmit={handleSubmit(onLogin)} className="relative flex flex-col rounded-[8px] items-center p-[60px] gap-[24px] self-stretch border-solid w-[535px] h-auto bg-white">
      <div className="w-[300px] text-center">
        <h1 className="text-[#212426] text-[36px] not-italic font-[600] leading-[52px] font-poppins">Welcome Back!</h1>
        <span className="text-[#212426] text-[18px] not-italic font-[400] leading-[22px] font-poppins">We are so glad to see you again!</span>
      </div>
      <div className="w-[415px] flex flex-col justify-between">
        <span className="text-[14px] font-[600] leading-[24px] font-poppins mb-1 ml-4">Email or Username</span><br/>
        <input {...register("username", loginValidate)} className="bg-[#D9D9D9] text-[#575A5C] outline-none w-[415px] h-[56px] rounded-[8px] py-[16px] pl-[19px]" type="text" placeholder="example@yourdomain.com"/>
        <span className="text-[14px] font-[400] leading-[24px] font-poppins text-[#F34735]">{ errors.username && (<span className='ml-4'>{ errors.username.message }</span>) }</span>
      </div>
      <div className="w-[415px] flex flex-col justify-between">
        <span className="text-[14px] font-[600] leading-[24px] font-poppins mb-1 ml-4">Password</span><br/>
        <span className="flex w-[415px] h-[56px]">
          <input {...register("password", passwordValidate)} className="bg-[#D9D9D9] text-[#575A5C] w-full outline-none rounded-tl-[8px] rounded-bl-[8px] py-[16px] pl-[19px]" type={showPassword} placeholder="Enter your password"/>
          <span className="w-[76px] flex justify-center items-center rounded-tr-[8px] rounded-br-[8px] bg-[#D9D9D9]">{basilEye}</span>
        </span>
        <span className="text-[14px] font-[400] leading-[24px] font-poppins text-[#F34735]">{ errors.password && (<span className='ml-4'>{ errors.password.message }</span>) }</span>
      </div>
      <div className="bg-[#E2F266] h-[56px] flex justify-center items-center gap-[10px] self-stretch rounded-[8px]">
        <button className="font-poppins w-full h-full hover:bg-[#CFDD63] rounded-[8px]" type="submit">Log In</button>
      </div>
      <div className="w-[414px] h-6 relative ">
        <div className="left-[255px] hover:cursor-pointer top-0 absolute text-right text-[#148ee6] text-sm font-normal font-['Poppins'] leading-normal">Forgot Your Password?</div>
        <div className="left-0 top-0 absolute text-right text-[#212426] text-sm font-normal font-['Poppins'] leading-normal">New to Sentimentia? </div>
        <div className="left-[148px] hover:cursor-pointer top-0 absolute text-right text-[#148ee6] text-sm font-normal font-['Poppins'] leading-normal" onClick={() => setShowRegister(true)}>Sign Up</div>
      </div>
    </form>
  )
}

export default LoginModal