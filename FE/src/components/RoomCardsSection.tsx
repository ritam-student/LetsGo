
import { useEffect, useState } from "react";
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

interface roomData{
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



interface roomcardSection{
    path: string,
}


function RoomCardsSection({path}: roomcardSection){

    const [data, setData] = useState<roomData[]>([]);
    const [isLoading , setIsLoading] = useState(false);
    
        useEffect(() => {
            
            fetchData();
            
            console.log("data is : " , data);
            console.log("type of data is : " , typeof(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
        } , []);
    
        const fetchData = async () => {
            setIsLoading(true);
            try{
                let res;
                try{
                    res = await axios.get(`http://localhost:3000/api/v1/room${path}`);
                    console.log(res);
                }catch(error){
                    if(axios.isAxiosError(error) && error.response){
                        const status = error.response.status;
                        if(status === 400){
                            console.log("bad request...");
                        }
                    }else{
                        console.log("internal error");
                    }
                }
                const newData = res?.data.data;
                setData(newData || []);
                console.log(data);
                setIsLoading(false);
            }catch(error){
                console.error(error);
            }
        }

    

        
    return <>
        {
            isLoading ? 
            <div className="text-white flex items-center justify-center text-2xl ">Loading Rooms Data....</div>
            :
            <div className=" flex md:flex-row flex-col flex-wrap  items-center justify-evenly gap-6">
                { 
                    data.map((data) => {
                        return <Roomcard key={data._id} data={data}/>
                    })
                }
            </div>
        }
    </>
}


export default RoomCardsSection;