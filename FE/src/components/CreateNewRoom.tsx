import axios from "axios";
import { IndianRupee, X } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



function CreateNewRoom(){

    const [isKitchen , setIsKitchen] = useState(false);
    const [isAc , setIsAc] = useState(false);
    const [isWifi , setIsWifi] = useState(false);
    const [isSingleBed , setIsSingleBed] = useState(false);
    const [isLoading , setIsLoading] = useState(false);
    
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const navigate = useNavigate();


    const emailRef = useRef<HTMLInputElement >(null);
    const housenameRef = useRef<HTMLInputElement >(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const addressRef = useRef<HTMLInputElement >(null);
    const priceRef = useRef<HTMLInputElement >(null);
    const countryRef = useRef<HTMLInputElement >(null);
    const typeRef = useRef<HTMLInputElement >(null);
    const cityRef = useRef<HTMLInputElement >(null);
    const stateRef = useRef<HTMLInputElement >(null);
    const areaRef = useRef<HTMLInputElement >(null);
    const pincodeRef = useRef<HTMLInputElement >(null);


    function changeKit(){
        setIsKitchen(s => !s);
    }

    function changeAc(){
        setIsAc(s => !s);
    }

    function changeBed(){
        setIsSingleBed(s => !s);
    }

    function changeWifi(){
        setIsWifi(s => !s);
    }

    function changeImage(e: React.ChangeEvent<HTMLInputElement>): void {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files); // Convert FileList to an array
    
            // Set images state (store all selected files)
            setImages((prevImages) => [...prevImages, ...filesArray]);
    
            // Generate preview URLs for each image
            const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
    
            // Set preview state
            setPreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
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


    async function submitForm() {
        const formDataArray = images.map((image) => {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "LetsGO");
            formData.append("cloud_name", "ritam-backend");
            return formData;
        });
    
        setIsLoading(true);
        const imageUrls: string[] = [];
    
        try {
            // Upload all images sequentially (or use Promise.all for parallel uploads)
            for (const formData of formDataArray) {
                const resp = await axios.post("https://api.cloudinary.com/v1_1/ritam-backend/image/upload", formData);
                console.log("Response:", resp);
                console.log("Uploaded Image URL:", resp.data.secure_url);
                imageUrls.push(resp.data.secure_url);
            }
    
            console.log("All Uploaded Image URLs:", imageUrls);
        } catch (error) {
            setIsLoading(false);
            console.log("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error while uploading images, Please try again later...",
                confirmButtonText: "Ok",
            });
            return;
        }

        if(emailRef.current?.value === undefined || emailRef.current.value === ""){
            emailRef.current?.focus();
        }else if(housenameRef.current?.value === undefined || housenameRef.current.value === ""){
            housenameRef.current?.focus();
        }else if(priceRef.current?.value === undefined || priceRef.current.value === ""){
            priceRef.current?.focus();
        }else if(addressRef.current?.value === undefined || addressRef.current.value === ""){
            addressRef.current?.focus();
        }else if(areaRef.current?.value === undefined || areaRef.current.value === ""){
            areaRef.current?.focus();
        }else if(pincodeRef.current?.value === undefined || pincodeRef.current.value === ""){
            pincodeRef.current?.focus();
        }else if(cityRef.current?.value === undefined || cityRef.current.value === ""){
            cityRef.current?.focus();
        }else if(stateRef.current?.value === undefined || stateRef.current.value === ""){
            stateRef.current?.focus();
        }else if(countryRef.current?.value === undefined || countryRef.current.value === ""){
            countryRef.current?.focus();
        }else if(descriptionRef.current?.value === undefined || descriptionRef.current.value === ""){
            descriptionRef.current?.focus();
        }else if(typeRef.current?.value === undefined || typeRef.current.value === ""){
            typeRef.current?.focus();
        }else if (!images){
            Swal.fire({
                icon: 'error',
                title: "Oops...",
                text: "Please upload an image...",
                confirmButtonText: "Ok"
            });
        }else {
            const email = emailRef.current?.value;
            const houseName = housenameRef.current?.value;
            const description = descriptionRef.current?.value;
            const address = addressRef.current?.value;
            const price = priceRef.current?.value;
            const country = countryRef.current?.value;
            let type = typeRef.current?.value;
            const city = cityRef.current?.value;
            const state = stateRef.current?.value;
            const area = areaRef.current?.value;
            const pincode = pincodeRef.current?.value;

            type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

            if(type !== "Apartment" && type !== "Pg" && type !== "Mess" && type !== "Hostel" ){
                Swal.fire({
                    icon: 'warning',
                    title: "Oops...",
                    text: "type should be either Apartment or Pg or Mess or Hostel...",
                    confirmButtonText: "Ok"
                });
                typeRef.current?.focus();
            }

            try{
                let res;
                try {
                    res = await axios.post("http://localhost:3000/api/v1/room/newroom", {
                        email,
                        houseName,
                        description,
                        address,
                        price,
                        country,
                        type,
                        city,
                        state,
                        area,
                        pincode,
                        images: imageUrls,
                        isAc,
                        isKitchen,
                        isSingleBed,
                        isWifi
                    },
                    {
                        headers: {
                            'sellerToken' : localStorage.getItem('sellerToken')
                        }
                    }
                );
                } catch (error) {
                    setIsLoading(s => !s);
                    if (axios.isAxiosError(error) && error.response) {
                        const statusCode = error.response.status;
                        if (statusCode === 401) {
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: "Become a seller to add rooms....",
                                confirmButtonText: "Ok"
                            });
                            console.log("Become a seller to add rooms.");
                        }else if (statusCode === 404) {
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: "Seller not found....",
                                confirmButtonText: "Ok"
                            });
                            console.log("Become a seller to add rooms.");
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: "Oops...",
                                text: "Failed to create room. Please try again later.....",
                                confirmButtonText: "Ok"
                            });
                            console.log("Failed to create room. Please try again later.");
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
                setIsLoading(s => !s);
                Swal.fire({
                    title: "sucess",
                    text : "Room created Sucessfully...",
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
    
    

    return <>
    <div className="bg-black flex items-center justify-center w-full h-auto px-4 md:px-6 lg:px-8 py-15">
        <div className="text-white relative  w-full flex flex-col items-center justify-center">
            <X className="absolute right-3 -top-5 hover:border-2 hover:border-gray-200 hover:rounded-md cursor-pointer" onClick={redirect} />
            <h2 className="text-4xl text-white  font-semibold  text-center  ">Add New Room</h2>
            <div className="flex flex-col items-start w-full   text-gray-300 text-lg font-medium gap-6">
                <div className="flex items-start justify-between flex-col md:flex-row w-full mt-20 lg:px-4">
                    <div className="flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ">
                        <p>Email Id : <span className="text-red-400 ml-2 text-xl">*</span></p>
                        <input type="text" ref={emailRef} placeholder="Enter your Email Id" className="border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-gray-400 w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>

                    <div className="flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ">
                        <p>House name : <span className="text-red-400 ml-2 text-xl">*</span></p>
                        <input type="text" ref={housenameRef} placeholder="Enter house name" className="border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-gray-400 w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>

                    <div className="relative flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ">
                        <p>Price: <span className="text-red-400 ml-2 text-xl">*</span> <span className="text-sm absolute left-1 bottom-2 text-white"><IndianRupee /></span></p>
                        <input type="text" ref={priceRef} placeholder="Enter house price" className="border-2 border-gray-400 px-7  py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-gray-400 w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>
                </div>
                <div className="flex items-start justify-between flex-col md:flex-row w-full mt-6 lg:px-4">
                    <div className="flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ">
                        <p>Address : <span className="text-red-400 ml-2 text-xl">*</span></p>
                        <input type="text" ref={addressRef} placeholder="Enter house address" className="border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-gray-400 w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>

                    <div className="flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ">
                        <p>Area : <span className="text-red-400 ml-2 text-xl">*</span></p>
                        <input type="text" ref={areaRef} placeholder="Enter area" className="border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-gray-400 w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>

                    <div className="relative flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ">
                        <p>Pincode : <span className="text-red-400 ml-2 text-xl">*</span></p>
                        <input type="text" ref={pincodeRef} placeholder="Enter pincode" className="border-2 border-gray-400 px-7  py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-gray-400 w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>
                </div>

                <div className="flex items-start justify-between flex-col md:flex-row w-full mt-6 lg:px-4">
                    <div className="flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ">
                        <p>City : <span className="text-red-400 ml-2 text-xl">*</span></p>
                        <input type="text" ref={cityRef} placeholder="Enter city name" className="border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-gray-400 w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>

                    <div className="flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ">
                        <p>State : <span className="text-red-400 ml-2 text-xl">*</span></p>
                        <input type="text" ref={stateRef} placeholder="Enter state name" className="border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-gray-400 w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>

                    <div className="relative flex items-start flex-col gap-3 mt-6 md:mt-0 w-full md:w-auto ">
                        <p>Country : <span className="text-red-400 ml-2 text-xl">*</span></p>
                        <input type="text" ref={countryRef} placeholder="Enter Country name" className="border-2 border-gray-400 px-7  py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-gray-400 w-full md:w-[220px] lg:w-[300px] shadow-md shadow-gray-400" />
                    </div>
                </div>

                <div className="flex items-start justify-between   w-full mt-6 lg:px-4">
                    <div className="flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ">
                        <label className={`text-lg md:text-xl lg:text-2xl ${isSingleBed ? "text-gray-300" : "line-through text-gray-600"} `}><input type="checkbox" onChange={changeBed}  id="1" className="w-4 md:w-5 lg:w-6  h-4 md:h-5 lg:h-6  accent-blue-500 cursor-pointer mr-3"  />Single Bed</label>
                    </div>

                    <div className="flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ">
                        <label className={`text-lg md:text-xl lg:text-2xl ${isWifi ? "text-gray-300" : "line-through text-gray-600"} `}><input type="checkbox" onChange={changeWifi}  id="2" className="w-4 md:w-5 lg:w-6  h-4 md:h-5 lg:h-6  accent-blue-500 cursor-pointer mr-3"  />Wi-Fi available</label>
                    </div>

                    <div className="flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ">
                        <label className={`text-lg md:text-xl lg:text-2xl ${isAc ? "text-gray-300" : "line-through text-gray-600"} `}><input type="checkbox" onChange={changeAc}   id="3" className="w-4 md:w-5 lg:w-6  h-4 md:h-5 lg:h-6  accent-blue-500 cursor-pointer mr-3"  />AC available</label>
                    </div>

                    <div className="flex items-start flex-col gap-3  md:mt-0 w-full md:w-auto ">
                        <label className={`text-lg md:text-xl lg:text-2xl ${isKitchen ? "text-gray-300" : "line-through text-gray-600"} `}><input type="checkbox" onChange={changeKit}  id="4" className="w-4 md:w-5 lg:w-6  h-4 md:h-5 lg:h-6  accent-blue-500 cursor-pointer mr-3"  />Kitchen available</label>
                    </div>
                </div>

                <div className="w-full mt-6 flex flex-col items-start gap-4">
                    <p>Description :<span className="text-red-400 ml-2 text-xl">*</span></p>
                    <textarea ref={descriptionRef} placeholder="Description" className="border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-gray-400 w-full  shadow-md shadow-gray-400"/>
                </div>
                <div className="w-full mt-6 flex flex-col items-start gap-4">
                    <p>Type :<span className="text-red-400 ml-2 text-xl">*</span></p>
                    <input type="text" ref={typeRef} placeholder="Mess or Hostel or PG or Apartment" className="border-2 border-gray-400 px-4 py-1 rounded-xl focus:border-blue-500 outline-none bg-gray-950 text-gray-400 w-full md:w-1/2 lg:w-1/3 shadow-md shadow-gray-400"/>
                </div>

                <div className="w-full">
                    <p>Upload some Images : <span className="text-red-400 ml-2 text-xl">*</span></p>
                    {
                        previews && 
                        <div className="flex items-start flex-wrap gap-1  w-auto">
                            {previews.map((preview, index) => (
                                <img key={index} src={preview} alt={`Preview ${index}`}  className="max-w-[100px]  my-[5px] rounded-xl " />
                            ))}
                        </div>
                    }
                    <input type="file" multiple accept="images/*"  onChange={changeImage}  className="rounded-xl  shadow-sm shadow-gray-500 text-white border-none bg-slate-900 focus:outline-blue-500 w-full my-5 h-[40px] px-4  cursor-pointer"  />
                    
                </div>

                <div className="w-full flex items-center justify-center">
                    <button onClick={submitForm} className="bg-pink-700 hover:bg-slate-900 px-10 md:px-20 lg:px-30 py-1 text-xl font-semibold transition-all hover:scale-105 cursor-pointer rounded-md shad">
                        {isLoading ? "Submiting..." : "Submit"}
                    </button>
                </div>

            </div>
        </div>
    </div>
    </>
}


export default CreateNewRoom;