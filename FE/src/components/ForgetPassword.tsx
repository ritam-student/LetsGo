import axios from "axios";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



function ForgetPassword(){

    const [isLoading , setIsLoading] = useState(false);
    const [notPasswordMatch , setNotPasswordMatch] = useState(false);
    const navigate = useNavigate();

    const newPasswordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    async function submitForgetPasswordForm(){
        if (emailRef.current?.value === undefined || emailRef.current.value === "" ){
            emailRef.current?.focus();
        }else if(newPasswordRef.current?.value === undefined || newPasswordRef.current.value === "" ){
            newPasswordRef.current?.focus();
        }else if (confirmPasswordRef.current?.value === undefined || confirmPasswordRef.current.value === "" ){
            confirmPasswordRef.current?.focus();
        }else if (confirmPasswordRef.current.value !== newPasswordRef.current.value ){
            setNotPasswordMatch(s => !s);
        } else{
            const newPass = newPasswordRef.current.value;
            const email = emailRef.current.value;
            console.log(newPass);
            console.log(email);

            try{
                setIsLoading(s => !s);
                let res;
                try {
                    res = await axios.put("http://localhost:3000/api/v1/user/forgetPassword", {
                        newPass,
                        email
                    });
                } catch (error) {
                    setIsLoading(s => !s);
                    if (axios.isAxiosError(error) && error.response) {
                        const statusCode = error.response.status;
                        if (statusCode === 404) {
                            toast.error("Can't find your details. Please try after sometime.");
                            console.log("Can't find your details. Please try after sometime.");
                        }else if (statusCode === 500){
                            toast.error("Internal error. Please try after sometime.");
                            console.log("Internal error. Please try after sometime.");
                        } else {
                            toast.error("Failed to change your password. Please try again later.");
                            console.log("Failed to change your password. Please try again later.");
                        }
                        console.error("Error response: ", error.response.data);
                    } else {
                        toast.error("Something went wrong. Please try again later.");
                        console.error("Unexpected error: ", error);
                    }
                    return; // Exit the function if an error occurs
                }
                console.log(res);
                setNotPasswordMatch(false);
                setIsLoading(s => !s);
                Swal.fire({
                    title: "sucess",
                    text : "Password changed Sucessfully...",
                    icon: "success",
                    confirmButtonText: "OK"
                });
            }catch(e){
                setIsLoading(s => !s);
                toast.error("Something went wrong. Try after sometimes...");
                console.log("error is : " + e);
            }
        }
    }


    function redirect(){
        const tab = localStorage.getItem("activeLink");
        if(!tab || tab === '/'){
            navigate("/");
        }else{
            navigate(`/${tab}`);
        }
        
    }


    return <div className="bg-black text-white font-semibold flex items-center justify-center w-full h-screen">
    <div className="relative bg-gray-950 h-auto w-[280px] md:w-[400px] lg:w-[600px] flex px-4 md:px-6 lg:px-8 py-8 rounded-xl  flex-col">
        
        <X  onClick={redirect}  className=" cursor-pointer absolute right-5 hover:border-2 hover:border-white/90 rounded-md text-gray-500 "/> 
        
        <h2 className="text-3xl text-white  font-semibold mt-[5vh] text-center  ">Forget Password</h2>

        <div className="mt-[4vh] ">
            <div className="relative">
                <p>Email : </p>
                <input type="email" ref={emailRef} placeholder="Enter your email" className={`rounded-xl shadow-sm shadow-gray-500 text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-5 h-[40px] px-4 ${notPasswordMatch? "focus:outline-red-500" : ""} `} />
            </div>
            <div className="relative">
                <p>New password : </p>
                <input type="password" ref={newPasswordRef} placeholder="Enter your new password" className={`rounded-xl shadow-sm shadow-gray-500 text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-5 h-[40px] px-4 ${notPasswordMatch? "focus:outline-red-500" : ""} `} />
            </div>
            <div className="relative">
                <p>Confirm pasword : </p>
                <input type="password" ref={confirmPasswordRef} placeholder="Enter your new password" className={`rounded-xl text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-5 h-[40px] px-4  ${notPasswordMatch? "focus:outline-red-500" : ""} `} />
                {
                    notPasswordMatch && <div className="absolute text-red-500 text-[18px]  right-1 -bottom-2">* Password doesn't matched</div>
                }
            </div>
        </div>

        <Link to={"/signin"} className="text-right text-blue-500 cursor-pointer block mt-3" >sign in ?</Link>



        <button className="bg-green-600 text-white rounded-xl font-semibold text-xl px-8 py-1 mt-[5vh] cursor-pointer hover:bg-green-800 "
        onClick={submitForgetPasswordForm}>
            {
                isLoading ? "Changing..." : "Change"
            }
        </button>
    </div>
    </div>
}


export default ForgetPassword;