import axios from "axios";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function Signup(){

    const navigate = useNavigate();

    const userNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);
    const [image , setImage] = useState<File | null>(null);
    const [preview , setPreview] = useState<string>("");


    const [isUserNameExist , setIsUserNameExist] = useState(false);
    const [isEmailExist , setIsEmailExist] = useState(false);
    const [isLoading , setIsLoading] = useState(false);


    function redirect(){
        const tab = localStorage.getItem("activeLink");
        if(!tab || tab === '/'){
            navigate("/");
        }else{
            navigate(`/${tab}`);
        }
        
    }


    async function submitSignupForm(){
        if(userNameRef.current?.value === undefined || userNameRef.current.value === ""){
            userNameRef.current?.focus();
            console.log('userNameRef');
        }else if(emailRef.current?.value === undefined || emailRef.current.value === ""){
            emailRef.current?.focus();
            console.log("emailRef");
        }else if (passwordRef.current?.value === undefined || passwordRef.current.value === ""){
            passwordRef.current?.focus();
            console.log("passwordRef");
        }else if (countryRef.current?.value === undefined || countryRef.current.value === ""){
            countryRef.current?.focus();
            console.log("countryRef");
        }else if (!image){
            Swal.fire({
                icon: 'error',
                title: "Oops...",
                text: "Please upload an image...",
                confirmButtonText: "Ok"
            });
        }else {
            const userName = userNameRef.current.value;
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            const country = countryRef.current.value;


            const formData = new FormData();

            formData.append("file" , image);
            formData.append("upload_preset" , "LetsGO");
            formData.append("cloud_name" , "ritam-backend");
             
            setIsLoading(s => !s);
            let imageUrl:string;
            try{
                const resp = await axios.post("https://api.cloudinary.com/v1_1/ritam-backend/image/upload", formData);
                console.log(resp);
                console.log(resp.data.secure_url);
                imageUrl = resp.data.secure_url;
            }catch(error){
                setIsLoading(s => !s);
                console.log("error is " , error);
                Swal.fire({
                    icon: 'error',
                    title: "Oops...",
                    text: "Error while uploading image, Please try after sometime...",
                    confirmButtonText: "Ok"
                })
                return;
            }

            console.log(imageUrl);
            try{
                
                let res;
                try {
                    res = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        userName,
                        email,
                        password,
                        country,
                        imageUrl
                    });
                } catch (error) {
                    setIsLoading(s => !s);
                    if (axios.isAxiosError(error) && error.response) {
                        const statusCode = error.response.status;
                        if (statusCode === 400) {
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: "Invalid input. Please check your details....",
                                confirmButtonText: "Ok"
                            });
                            console.log("Invalid input. Please check your details.");
                        } else if (statusCode === 409) {
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: "email already exists. Try logging in.....",
                                confirmButtonText: "Ok"
                            });
                            console.log("email already exists. Try logging in.");
                            emailRef.current.focus();
                            setIsEmailExist(s => !s);
                        }else if (statusCode === 410) {
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: "eusername already exists. Try logging in.....",
                                confirmButtonText: "Ok"
                            });
                            console.log("username already exists. Try logging in.");
                            userNameRef.current.focus();
                            setIsUserNameExist(s => !s);
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: "Failed to create an account. Please try again later.....",
                                confirmButtonText: "Ok"
                            });
                            console.log("Failed to create an account. Please try again later.");
                        }
                        console.error("Error response: ", error.response.data);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: "Oops...",
                            text: "Something went wrong. Please try again later.....",
                            confirmButtonText: "Ok"
                        });
                        console.error("Unexpected error: ", error);
                    }
                    return; // Exit the function if an error occurs
                }
                console.log(res.data);
                setIsEmailExist(s => !s);
                setIsUserNameExist(s => !s);
                setIsLoading(s => !s);
                Swal.fire({
                    title: "sucess",
                    text : "Sign up Sucessfully...",
                    icon: "success",
                    timer: 3000,
                    confirmButtonText: "OK"
                });
                redirect();
            }catch(e){
                Swal.fire({
                    icon: 'error',
                    title: "Oops...",
                    text: "Something went wrong. Please try again later.....",
                    confirmButtonText: "Ok"
                });
                setIsLoading(s => !s);
                console.log("error is : " + e);
            }

        }
    }

    function changeImage(e: React.ChangeEvent<HTMLInputElement>): void {
        const file: File | null = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImage(file);
            console.log(file);
            setPreview(URL.createObjectURL(file));
            
        }
    }

    return <div className="h-auto w-full bg-black text-gray-100 font-semibold text-xl flex items-center justify-center py-15">
    <div className={`relative  bg-black shadow-lg shadow-gray-400    w-[400px] md:w-[500px] lg:w-[600px] flex px-9 py-4 md:py-6 lg:py-8 rounded-xl  flex-col `}>
        
        <X  onClick={redirect}  className=" cursor-pointer absolute right-5 hover:border-2 hover:border-white/90 rounded-md text-gray-500"/> 
        
        <h2 className="text-4xl text-white  font-semibold mt-[4vh] text-center ">sign up</h2>

        <div className="mt-[8vh] ">
            <div className="relative">
                <p>UserName : </p>
                <input type="text" ref={userNameRef} placeholder="Enter your UserName" className={`rounded-xl shadow-sm shadow-gray-500 text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-5 h-[40px] px-4  ${isUserNameExist ? "focus:outline-red-600" : "" } `} />
                {
                    isUserNameExist && <div className="absolute text-red-500 right-1 -bottom-1">* UserName already exist</div>
                }
            </div>
            <div className="relative">
                <p>Email : </p>
                <input type="email" ref={emailRef} placeholder="Enter your Email" className={`rounded-xl shadow-sm shadow-gray-500 text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-5 h-[40px] px-4  ${isEmailExist ? "focus:outline-red-600" : "" } `} />
                {
                    isEmailExist && <div className="absolute text-red-500 right-1 -bottom-1">* Email already exist</div>
                }
            </div>
            <p>Pasword : </p>
            <input type="password" ref={passwordRef} placeholder="Enter your password" className="rounded-xl shadow-sm shadow-gray-500  text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-5 h-[40px] px-4  " />
            <p>Country : </p>
            <input type="text" ref={countryRef} placeholder="Enter your country" className="rounded-xl  shadow-sm shadow-gray-500 text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-5 h-[40px] px-4  " />
            <p>UserImage :  </p>
            <input type="file" accept="images/*"  onChange={changeImage}  className="rounded-xl  shadow-sm shadow-gray-500 text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-5 h-[40px] px-4  cursor-pointer"  />
            {
                preview && <img src={preview} alt="Preview" className="max-w-[200px]" />
            }
            
        </div> 
        <span className="mt-2 text-right cursor-pointer text-gray-400">Already have an account ? <Link to={"/signin"} className="text-blue-500"> sign in</Link> </span>



        <button className="bg-green-600 hover:bg-green-800 text-white rounded-xl font-semibold text-xl px-8 py-1 mt-[6vh] cursor-pointer"
        onClick={submitSignupForm}>
            {
                isLoading ? "Submitting..." : "Submit"
            }
        </button>
    </div>
    </div>
}

export default Signup;