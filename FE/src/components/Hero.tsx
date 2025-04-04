import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";




function Hero(){

    const navigate = useNavigate();


    function changePage(){
        if(localStorage.getItem('token')){
            navigate('/newhost');
        }else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops !',
                text: 'Please Sign in to Become a Host...',
                confirmButtonText: 'OK',
                timer: 3000
            });
        }
    }

    return <>
    <div className="relative w-full h-auto bg-black/50 z-0">
      <div className="relative w-full h-auto z-50 py-30 bg-black  text-white ">
        {
            localStorage.getItem('sellerToken') === null || localStorage.getItem('sellerToken') === "undefined" ?
            <button onClick={changePage} className="text-pink-600 border-2 border-red-500 rounded-xl absolute top-12 hover:bg-red-600 hover:text-white text-xl font-bold px-4 py-2 cursor-pointer hover:scale-105  transition-colors backdrop-blur-xl right-8">Become a Host</button>
            :
            <Link to={'/createnewroom'} className="text-pink-600 border-2 border-red-500 rounded-xl absolute top-12 hover:bg-red-600 hover:text-white text-xl font-bold px-4 py-2 cursor-pointer hover:scale-105  transition-colors backdrop-blur-xl right-8">Add new Rooms</Link>
        }

        <div className="flex items-center justify-center flex-col  mt-25 ">
            <div className="text-white/70  hover:text-white cursor-pointer  lg:text-8xl text-center font-mono text-5xl md:text-6xl  pb-1 rounded-md transition-all ">
                Enter some text
                <div className="h-1 w-full bg-white/70 hover:bg-white mt-2"></div>
            </div>
        </div>
    </div>
    </div>
    
    </>
}


export default Hero;