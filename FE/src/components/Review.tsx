import { Star } from "lucide-react"


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

interface review{
    _id: string,
    userDetails: user,
    roomId : roomData,
    content: string,
    ratings: string,
    name: string
}
interface data{
    review: review
}



function Review ({review}: data){
    return <>
    <div className="h-auto text-white rounded-md shadow-xl  shadow-gray-400  bg-slate-800 px-6 py-5 ">
        <div className="flex items-center gap-4 justify-start">
            <div className="bg-green-500 rounded-full overflow-hidden h-12 w-12 relative flex items-center justify-center">
                <div style={{backgroundImage: `url(${review.userDetails.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}} className='absolute z-0 inset-0'>
                </div>
            </div>
            <div className="">
                <p className="text-xl font-semibold text-white"> {review.name} </p>
                <p className="text-gray-300"> {review.userDetails.country} </p>
            </div>
        </div>

        <div className="my-4 mx-1 text-xl flex items-center gap-2  ">
            <Star size={"20px"}/> {review.ratings}
        </div>

        <div className="text-gray-300 text-lg">
            {review.content}
        </div>
    </div>
    </>
}


export default Review; 