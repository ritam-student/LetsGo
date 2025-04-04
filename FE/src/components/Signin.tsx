import axios from "axios";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";








interface User{
    _id: string,
    userName: string,
    email: string,
    password: string,
    country: string,
    state: string | undefined,
    area: string | undefined,
    city: string,
    pincode: string | undefined,
    saved: string[] | null ,
    likes: string[] | null ,
    dislikes: string[] | null ,
    bookedRooms: string[] | null,
    imageUrl: string
}

interface signin {
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>
}

function Signin({setUser , setIsLoggedIn} : signin){

    const navigate = useNavigate();


    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    
    const [isEmailDoesnotExist , setIsEmailDoesnotExist] = useState(false);
    const [isLoading , setIsLoading] = useState(false);



    function redirect(){
        const tab = localStorage.getItem("activeLink");
        if(!tab || tab === '/'){
            navigate("/");
        }else{
            navigate(`/${tab}`);
        }
        
    }



    async function submitSigninForm(){
        if(emailRef.current?.value === undefined || emailRef.current.value === ""){
            emailRef.current?.focus();
            console.log("emailRef");
        }else if (passwordRef.current?.value === undefined || passwordRef.current.value === ""){
            passwordRef.current?.focus();
            console.log("passwordRef");
        }else {
            
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            try{
                setIsLoading(s => !s);
                let res;
                try {
                    res = await axios.post("http://localhost:3000/api/v1/user/signin", {
                        email,
                        password,
                    });
                } catch (error) {
                    setIsLoading(s => !s);
                    if (axios.isAxiosError(error) && error.response) {
                        const statusCode = error.response.status;
                        if (statusCode === 404) {
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: "Invalid input. Please check your details.....",
                                confirmButtonText: "Ok"
                            });
                            console.log("Invalid input. Please check your details.");
                            emailRef.current.focus();
                            setIsEmailDoesnotExist(true);
                        } else if (statusCode === 403) {
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: "User does not exist. Please signup....",
                                confirmButtonText: "Ok"
                            });
                            console.log("User does not exist. Please signup...");
                            emailRef.current.focus();
                            setIsEmailDoesnotExist(s => !s);
                        }else if (statusCode === 402) {
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: "Invalid credentials. Please check....",
                                confirmButtonText: "Ok"
                            });
                            console.log("Invalid credentials. Please check...");
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: "Failed to sign in. Please try again later....",
                                confirmButtonText: "Ok"
                            });
                            console.log("Failed to sign in. Please try again later.");
                        }
                        console.error("Error response: ", error.response.data);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: "Oops...",
                            text: "Something went wrong. Please try again later....",
                            confirmButtonText: "Ok"
                        });
                        console.error("Unexpected error: ", error);
                    }
                    return; // Exit the function if an error occurs
                }
                console.log(res);
                localStorage.setItem('token' , res.data.data.token);
                localStorage.setItem('userImgUrl' , res.data.data.userData.imageUrl);
                localStorage.setItem('sellerToken' , res.data.data.sellerToken);
                setUser(res.data.data.userData);
                console.log("token : ", res.data.data.token);
                console.log("user details : " , res.data.data.userData);
                setIsEmailDoesnotExist(s => !s);
                setIsLoading(s => !s);
                setIsLoggedIn(true);
                Swal.fire({
                    title: "sucess",
                    text : "Sign in Sucessfully...",
                    icon: "success",
                    timer: 3000,
                    confirmButtonText: "OK"
                });
                redirect();
            }catch(e){
                Swal.fire({
                    icon: 'error',
                    title: "Oops...",
                    text: "Something went wrong. Try after sometimes....",
                    confirmButtonText: "Ok"
                });
                setIsLoading(s => !s);
                console.log("error is : " + e);
            }

        }
    }



    return <div className="h-auto w-full text-gray-100 font-semibold text-xl flex items-center justify-center bg-black py-16 ">
    <div className="relative bg-black shadow-lg shadow-gray-400  w-[310px] md:w-[400px] lg:w-[600px] flex px-9 py-4 md:py-6 lg:py-8 rounded-xl  flex-col">
        
        <X  onClick={redirect}  className=" cursor-pointer absolute right-5 hover:border-2 hover:border-white/90 rounded-md text-gray-500 "/> 
        
        <h2 className="text-4xl text-white  font-semibold mt-[5vh] text-center  ">sign in</h2>

        <div className="mt-[12vh] ">
            <div className="relative">
                <p>Email : </p>
                <input type="email" ref={emailRef} placeholder="Enter your Email" className={`rounded-xl shadow-sm shadow-gray-500 text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-5 h-[40px] px-4  ${isEmailDoesnotExist ? "focus:outline-red-600" : "" } `} />
                {
                    isEmailDoesnotExist && <div className="absolute text-red-500 right-1 -bottom-1">* Email already exist</div>
                }
            </div>
            <p>Pasword : </p>
            <input type="password" ref={passwordRef} placeholder="Enter your password" className="rounded-xl text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-5 h-[40px] px-4  " />
        </div>

        <Link to={"/forgetPassword"} className="text-right text-blue-500 cursor-pointer ">Forget Password ?</Link>
        <span className="text-right cursor-pointer text-gray-400">Don't have an account ? <Link to={"/signup"} className="text-blue-500"> sign up</Link> </span>




        <button className="bg-green-600 text-white rounded-xl font-semibold text-xl px-8 py-1 mt-[10vh] cursor-pointer hover:bg-green-800 "
        onClick={submitSigninForm}>
            {
                isLoading ? "Submitting..." : "Submit"
            }
        </button>
    </div>
    </div>
}

export default Signin;