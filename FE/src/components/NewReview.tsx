import axios from "axios";
import { X } from "lucide-react";
import {  useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


function NewReview(){

    const {id} = useParams();

    const navigate = useNavigate();
    const nameRef = useRef<HTMLInputElement>(null);
    const ratingRef = useRef<HTMLInputElement>(null);
    const reviewRef = useRef<HTMLTextAreaElement>(null);
    const [isLoading , setIsLoading] = useState(false);



    function redirect(){
        const tab = localStorage.getItem("activeLink");
        if(!tab || tab === '/'){
            navigate("/");
        }else{
            navigate(`/${tab}`);
        }
        
    }

    async function submitForm(){
        if(nameRef.current?.value === undefined || nameRef.current.value === ""){
            nameRef.current?.focus();
        }else if(ratingRef.current?.value === undefined || ratingRef.current.value === ""){
            ratingRef.current?.focus();
        }else if(parseFloat(ratingRef.current?.value) > 5.00 ){
            Swal.fire({
                icon: 'warning',
                title: 'Oops',
                text: 'Rating must be in between 1 to 5',
                confirmButtonText: 'OK'
            });
            ratingRef.current?.focus();
        }else if(reviewRef.current?.value === undefined || reviewRef.current.value === ""){
            reviewRef.current?.focus();
        }else {
            setIsLoading(true);
            const name = nameRef.current.value;
            const ratings = ratingRef.current.value;
            const review = reviewRef.current.value;

            try{
                const res = await axios.post(`http://localhost:3000/api/v1/review/newreview/${id}`, {
                    name,
                    ratings,
                    review
                },{
                    headers: {
                        token: localStorage.getItem('token')
                    }
                });

                setIsLoading(false);
                Swal.fire({
                    title: "Sucess",
                    icon: "success",
                    text: "Review created sucessfully...",
                    confirmButtonText: "OK"
                });
                redirect();

                console.log(res.data.data);
            }catch(error){
                setIsLoading(false);
                if (axios.isAxiosError(error) && error.response) {
                    const statusCode = error.response.status;
                    if (statusCode === 400) {
                        console.log("error is : " , error);
                    }
                }
            }
        }
    }

    return <>
    <div className="bg-black h-auto w-full flex items-center justify-center text-white py-20">
        <div className="bg-slate-900 rounded-xl h-auto w-auto px-4 md:px-6 lg:px-8 py-8 flex items-center justify-center flex-col relative ">
            <X size={"30px"} onClick={redirect} className="absolute cursor-pointer right-3 top-2 hover:border-2 hover:border-gray-200 rounded-md"/>
            <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold ">Add Review</h2>
            <div>
                <div className="mt-[12vh] ">
                    <div className="relative">
                        <p className="text-lg font-semibold text-gray-300">Your Name : <span className="text-red-500 ml-1">*</span></p>
                        <input type="text" ref={nameRef}  placeholder="Enter your name" className={`rounded-xl shadow-sm shadow-gray-500 text-white border-none bg-slate-900 focus:outline-blue-500 w-[70vw] md:w-[50vw] lg:w-[40vw] my-5 h-[40px] px-4`} />
                    </div>
                    <p className="text-lg font-semibold text-gray-300">Enter your ratings : <span className="text-red-500 ml-1">*</span></p>
                    <input type="text" ref={ratingRef}  placeholder="Enter your ratings (0 to 5)" className={`rounded-xl shadow-sm shadow-gray-500 text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-5 h-[40px] px-4`} />
                    <p className="text-lg font-semibold text-gray-300">Review : <span className="text-red-500 ml-1">*</span></p>
                    <textarea name="Rveview" ref={reviewRef} placeholder="Enter your review here..." className={`rounded-xl shadow-sm shadow-gray-500 text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-5 px-4 pt-1.5`}></textarea>
                </div>
            </div>
            <button onClick={submitForm} className="text-xl font-semibold text-white bg-pink-500 hover:bg-slate-800 cursor-pointer px-8 md:px-12 lg:px-20 py-1 rounded-xl mt-8">
                {
                    isLoading ?
                    "submitting...."
                    :
                    "submit"
                }
            </button>
        </div>
    </div>
    </>
}


export default NewReview;