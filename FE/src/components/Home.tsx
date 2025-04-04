import { useRef, useState } from "react";
import RoomCardsSection from "./RoomCardsSection";
import Roomcard from "./Roomcard";
import axios from "axios";



interface user{
    _id: string,
    userName: string,
    email: string,
    imageUrl : string,
    password: string,
    city:string,
    country: string,
    saved: {_id:string}[],
    likes: {_id:string}[],
    dislikes: {_id: string}[],
    bookedRooms: {_id:string}[],
    pincode: string,
    state: string
}


interface owner{
    _id : string,
    name: string,
    userDetails: user,
    experience: string,
    rooms: {_id:string}[]
}

interface data{
    _id: string,
    houseName: string,
    owner: owner,
    description: string,
    roomsImageUrls: string[],
    address: string,
    price: number,
    country: string,
    type: string,
    city : string,
    likes: {_id: string}[],
    dislikes: {_id: string}[],
    saved: {_id: string}[],
    state: string,
    area: string,
    pincode: string,
    sellerEmail: string,
    isAc: boolean,
    isSingleBed: boolean,
    isKitchen: boolean,
    freeWifi: boolean,
    reviews: {_id:string}[]
}



function Home(){
    const [roomDetails , setRoomDetails] = useState<data[] | null>(null);
    const timer = useRef(0);
    const searchRef = useRef<HTMLInputElement>(null);
    const [isLoading , setIsLoading] = useState(false);
    const [isError , setIsError] = useState(false);

    async function mainFun(val: string){
        
        try{
            const res = await axios.get(`http://localhost:3000/api/v1/room/searchFromAll?query=${val}`);
            console.log(res.data);
            console.log(res.data.data);
            setRoomDetails(res.data.data);
            setIsError(false);
            setIsLoading(false);
            
        }catch(error){
            setIsError(true);
            setIsLoading(false);
            if (axios.isAxiosError(error) && error.response){
                const status = error.response.status;
                if(status === 404){
                    console.log('error');
                }
            }
            
        }
    }
    
    function onChangeInput(e: React.ChangeEvent<HTMLInputElement>): void {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            console.log(e.target.value);
            const val = e.target.value;
            if (val === ""){
                setRoomDetails(null);
                return;
            }
            setIsLoading(true);
            mainFun(val);
        }, 1000);
    }


    async function search(){
            setIsLoading(true);
            const val = searchRef.current?.value;
            try{
                const res = await axios.get(`http://localhost:3000/api/v1/room/searchFromApartment?query=${val}`);
                console.log(res.data);
                console.log(res.data.data);
                setRoomDetails(res.data.data);
                setIsLoading(false);
            }catch(error){
                setIsError(true);
                setIsLoading(false);
                if (axios.isAxiosError(error) && error.response){
                    const status = error.response.status;
                    if(status === 404){
                        console.log('error');
                    }
                }
                
            }
        }





    return <>
        <div className="w-full h-auto py-6 px-4 md:px-6 lg:px-8 bg-black">
            <div className="flex items-center  justify-center pt-25  md:gap-2 gap-4 flex-col md:flex-row ">
                <input type="text" ref={searchRef} onChange={onChangeInput} placeholder="search by country or state or area name"  className="bg-black hover:border-t-2 hover:border-gray-400 shadow-md shadow-gray-400 w-[90vw] md:w-[70vw] lg:w-[55vw] rounded-2xl text-sm md:text-lg lg:text-xl outline-none focus:border-2 focus:border-gray-400 text-white py-3 px-4"/>
                <button onClick={search} className="text-white text-xl bg-black shadow-md shadow-gray-400 px-4 py-3 rounded-2xl cursor-pointer hover:bg-pink-800 font-semibold transition-colors">Search</button>
            </div>

            <div className=" w-full h-auto text-white py-4 mt-20  ">
                {
                    isError ? 
                    <div className="text-white text-xl font-semibold text-center">Something went wrong, please check your internet connection and try again...</div>
                    :
                    <>
                    {
                        isLoading ?
                        <div className="text-white text-xl font-semibold text-center">Loading Rooms data....</div>
                        :
                        <div>
                            {
                                ( roomDetails === null)?
                                <RoomCardsSection path={'/'}  />
                                :
                                <div className=" flex md:flex-row flex-col flex-wrap  items-center justify-evenly gap-6">
                                    {
                                        roomDetails.length === 0 ?
                                        <div className="text-white text-xl font-semibold">No such Rooms available</div>
                                        :
                                        roomDetails.map((room ) => {
                                            return <Roomcard key={room._id} data={room}/>
                                        })
                                    }
                                </div>
                                
                            }
                            
                        </div>
                    }
                    </>
                }
            </div>
        </div>
    </>
}



export default Home;