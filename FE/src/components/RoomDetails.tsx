import { AirVent, Bed, CookingPot, IndianRupee, Wifi, X } from "lucide-react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Review from "./Review";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";



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
  reviews: review[]
}

interface review{
  _id: string,
  userDetails: user,
  roomId : roomData,
  content: string,
  ratings: string,
  name: string
}


function RoomDetails(){

    const navigate = useNavigate();
    const {id} = useParams();

    const [data, setData] = useState<roomData | null>(null);
    const [isLoading , setIsLoading] = useState(true);
    const [isError , setIsError] = useState(false);

    function redirect(){
      const tab = localStorage.getItem("activeLink");
      if(!tab || tab === '/'){
          navigate("/");
      }else{
          navigate(`/${tab}`);
      }
      
  }

  useEffect(() => {
    console.log(id);
    if (! localStorage.getItem('token') || localStorage.getItem('token') === undefined || localStorage.getItem('token') === null ){
      Swal.fire({
        icon: 'warning',
        title: 'Sorry !',
        text: 'Please Sign in to access room details...',
        confirmButtonText: 'Ok'
      });
      redirect();
      return;
    }
    const fetchData = async () => {
        setIsLoading(true);
        try{
          let res;
          try{
              res = await axios.get(`http://localhost:3000/api/v1/room/roomdetails/${id}`,
                {
                  headers: {
                    token: localStorage.getItem("token")
                  }
                }
              );
              console.log(res);
          }catch(error){
              setIsError(true);
              setIsLoading(false);
              if(axios.isAxiosError(error) && error.response){
                  const status = error.response.status;
                  if(status === 404){
                      console.log("room not found...");
                      Swal.fire({
                        icon: "error",
                        title: 'Oops !',
                        text: 'Room details not found...',
                        confirmButtonText: 'OK'
                      });
                      
                  }else if(status === 401){
                    console.log("Unauthorized access...");
                      Swal.fire({
                        icon: "error",
                        title: 'Oops !',
                        text: 'Please Sign in first...',
                        confirmButtonText: 'OK'
                      });
                  }else{
                    console.log("Error while getting room details...");
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops !',
                      text: 'Error while getting room details...',
                      confirmButtonText: 'OK'
                    })
                  }
              }else{
                  console.log("internal error");
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops !',
                    text: 'Internal Error',
                    confirmButtonText: 'OK'
                  });
              }
              setIsLoading(false);
              return;
        }
          setIsError(false);
          const newData = res?.data.data;
          setData(newData);
          console.log(newData);
          setIsLoading(false);
        }catch(error){
          setIsError(true);
            console.error(error);
            setIsLoading(false);
        }
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return <>
    <div className="text-white left-0 right-0  px-6 md:px-14 lg:px-20 top-0 z-50 h-auto w-full relative bg-black ">
        <X onClick={redirect}  className="cursor-pointer text-slate-400 absolute right-2 top-2 hover:border-2 hover:border-gray-200 rounded-md "/>
        {
          isError ? 
          <div className="w-full h-screen flex flex-col items-center justify-center text-gray-200 text-xl font-bold">
            <div className="text-white text-8xl">Sorry !</div>
            <p className="text-2xl mt-4">Error while getting Room details ...</p>
          </div>
          : 
          <>
          {
            isLoading ? 
            <>
              <div className="flex items-center justify-end pt-10  ">
                <button className="bg-gray-900 text-gray-900 px-4 py-2 rounded-xl  ">save</button>
              </div>
              

              {/**  mobile view  */}
              <div className="h-auto py-8 my-8">
              <Swiper
              slidesPerView={1} // Default for small screens
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2, // For small screens (sm)
                },
                768: {
                  slidesPerView: 3, // For medium screens (md)
                },
                1024: {
                  slidesPerView: 4, // For large screens (lg)
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
                >
                  <SwiperSlide >
                      <div className="bg-gray-900 relative rounded-md h-[300px] ">
                        
                      </div>
                  </SwiperSlide>
                </Swiper>
          
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
                  <div className="w-full md:w-1/2 ">
                      <div className="bg-gray-900 h-4 rounded-md w-1/2  "></div>
                      <div className="bg-gray-900 h-3 rounded-md w-1/3 mt-3"></div>
                      <div className="flex items-center justify-between gap-3 border-t-2 border-b-2 border-gray-900 py-2 px-2 my-8">
                          <div className="rounded-full border-2 border-gray-900 h-12 w-12 flex items-center justify-center bg-gray-900"></div>
                          <div>
                              <p className="h-4 rounded-md w-[150px] bg-gray-900"></p>
                              <p className="h-2 rounded-md w-[110px] bg-gray-900 mt-3"></p>
                          </div>
                      </div>
                  </div>
                  <div className="w-full md:w-1/2 flex items-center justify-center cursor-pointer">
                      <div className="bg-gray-800 px-10 py-6 my-4 rounded-md shadow-md shadow-gray-400">
                          <p className="text-2xl font-semibold flex items-center justify-center gap-1 h-4 w-full bg-gray-900 rounded-md  "> </p>
                          <p className="my-2 text-[22px] border-b-2 border-gray-800 pb-2 h-3 w-1/2 bg-gray-900 rounded-md "></p>
                          <ul className="flex flex-col  gap-2 justify-between mt-6">
                              <li className="flex items-center justify-start gap-2 h-2 w-1/3 bg-gray-900 rounded-md"></li>
                              <li className="flex items-center justify-start gap-2 h-2 w-1/3 bg-gray-900 rounded-md"></li>
                              <li className="flex items-center justify-start gap-2 h-2 w-1/3 bg-gray-900 rounded-md"></li>
                              <li className="flex items-center justify-start gap-2 h-2 w-1/3 bg-gray-900 rounded-md"></li>
                          </ul>
                          <div className="bg-gray-900 text-gray-900 h-5 w-full text-center text-xl px-10 py-1 rounded-md cursor-pointer mt-4  "></div>
                      </div>
                  </div>
              </div>

              

              <div className="h-auto py-8 my-8">
              <Swiper
              slidesPerView={1} // Default for small screens
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2, // For small screens (sm)
                },
                768: {
                  slidesPerView: 3, // For medium screens (md)
                },
                1024: {
                  slidesPerView: 4, // For large screens (lg)
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
                >
                  <SwiperSlide  >
                    <div className="h-auto text-white rounded-md  bg-slate-800 px-6 py-5 ">
                        <div className="flex items-center gap-2 justify-start">
                            <div className="bg-gray-900 rounded-full h-16 w-16 flex items-center justify-center"></div>
                            <div className="">
                                <p className="text-xl font-semibold text-white bg-gray-800 h-3 w-1/2 rounded-md"></p>
                                <p className="text-gray-300 bg-gray-800 h-3 w-1/2 rounded-md"></p>
                            </div>
                        </div>

                        <div className="my-4  text-[18px] h-4 w-1/2 bg-gray-900 rounded-md">
                            
                        </div>

                        <div className="text-gray-300 h-2 w-1/3 bg-gray-900 rounded-md">
                            
                        </div>
                    </div>
                  </SwiperSlide>
              </Swiper>
          
              </div>
            </>
            :
            <>
              <div className="flex items-center justify-end pt-10  ">
                <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded-xl text-xl  hover:bg-red-800 cursor-pointer">save</button>
              </div>
              

              {/**  mobile view  */}
              <div className="h-auto py-8 my-8">
              <Swiper
              slidesPerView={1} // Default for small screens
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2, // For small screens (sm)
                },
                768: {
                  slidesPerView: 3, // For medium screens (md)
                },
                1024: {
                  slidesPerView: 4, // For large screens (lg)
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
                >
              {
                  data?.roomsImageUrls.map((data , i) => {
                  return <SwiperSlide key={i} >
                      <div className="bg-gray-300 relative rounded-xl h-[300px] ">
                        <div style={{backgroundImage: `url(${data})`, backgroundSize: 'cover', backgroundPosition: 'center'}} className='absolute rounded-xl z-0 inset-0'>
                          
                        </div>
                      </div>
                  </SwiperSlide>
                  })
              }
              </Swiper>
          
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
                  <div className="w-full md:w-1/2 ">
                      <div className="text-white text-3xl font-semibold"> {data?.state} , {data?.country} </div>
                      <div className="text-gray-300 mt-1 text-xl">{data?.address} , {data?.area} , {data?.pincode}</div>
                      <div className="flex items-center justify-between gap-3 border-t-2 border-b-2 border-gray-500/50 py-2 px-2 my-8">
                          <div className="rounded-full border-2 border-gray-400 relative h-12 w-12 flex items-center justify-center overflow-hidden">
                            <div style={{backgroundImage: `url(${data?.owner.userDetails.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}} className='absolute z-0 inset-0'>
                            </div>
                          </div>
                          <div>
                              <p className="text-2xl text-gray-300">Hosted by <span className="text-white">{data?.owner.name}</span></p>
                              <p>{data?.owner.experience} YOE ,  <span className="text-blue-300 cursor-pointer hover:text-blue-500">{data?.sellerEmail}</span></p>
                          </div>
                      </div>
                  </div>
                  <div className="w-full md:w-1/2 flex items-center justify-center cursor-pointer ">
                      <div className="bg-slate-900 px-10 py-6  rounded-md shadow-md  relative shadow-gray-400">
                          <p className="text-2xl font-semibold flex items-start  gap-1  "> <IndianRupee size={"22px"} className="top-8 left-9 absolute " /> <span className="text-2xl ml-5 mt-0.5">{data?.price}/Month</span></p>
                          <p className="my-2 text-2xl font-semibold border-b-2 border-slate-700 mt-6 pb-2">Facilities :</p>
                          <ul className="flex flex-col  gap-2 justify-between mt-4">
                              <li className="flex items-center justify-start gap-2 text-xl"> <AirVent className="text-gray-300" /> 
                                {
                                  data?.isAc ? 
                                  <p>AC available</p>
                                  :
                                  <p className="line-through">AC available</p>
                                }
                              </li>
                              <li className="flex items-center justify-start gap-2 text-xl">  <Bed className="text-gray-300" />
                                {
                                  data?.isSingleBed ? 
                                  <p>Single Bed available</p>
                                  :
                                  <p className="line-through">Single Bed available</p>
                                }
                               </li>
                              <li className="flex items-center justify-start gap-2 text-xl"> <CookingPot className="text-gray-300" />
                                {
                                  data?.isKitchen ? 
                                  <p>Kitchen available</p>
                                  :
                                  <p className="line-through">Kitchen available</p>
                                }
                               </li>
                              <li className="flex items-center justify-start gap-2 text-xl"> <Wifi className="text-gray-300" /> 
                                {
                                  data?.freeWifi ? 
                                  <p>Free Wi-fi </p>
                                  :
                                  <p className="line-through">Free Wi-fi </p>
                                }
                              </li>
                          </ul>
                          <div className="bg-pink-500 text-white text-center text-xl px-10 py-1  rounded-md cursor-pointer mt-8 font-semibold hover:bg-red-800 ">Book</div>
                      </div>
                  </div>
              </div>

              <div>
                  <p className="text-gray-300 text-xl my-8 ">{data?.description}</p>
              </div>

              <div className="h-auto py-12 ">
              {
                data?.reviews.length === 0 ?
                <div className="w-full h-auto flex items-center justify-center">
                  <Link to={`/newreview/${id}`} className="border-b-2 border-gray-300 transition-all">Add new Review</Link>
                </div>
                :
                <>
                <Swiper
                slidesPerView={1} // Default for small screens
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2, // For small screens (sm)
                  },
                  768: {
                    slidesPerView: 3, // For medium screens (md)
                  },
                  1024: {
                    slidesPerView: 4, // For large screens (lg)
                  },
                }}
                modules={[Pagination]}
                className="mySwiper"
                  >
                {
                    data?.reviews.map((review , i) => {
                    return <SwiperSlide key={i} ><Review review={review}/></SwiperSlide>
                    })
                }
                </Swiper>
                <div className="w-full h-auto flex mt-4 items-center justify-center">
                  <Link to={`/newreview/${id}`} className="border-b-2 border-gray-300 transition-all">Add new Review</Link>
                </div>
                </>
              }
              
          
              </div>
            </>
          }
            
          </>
        }
    </div>
    </>
}


export default RoomDetails;