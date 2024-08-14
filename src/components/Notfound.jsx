import { Link, useNavigate } from "react-router-dom";
import gif from "/404.gif";
const Notfound = () => {
  const navigate= useNavigate()
  return (
    <div className="top-0 left-0  absolute w-screen h-screen flex justify-center items-center bg-black">
      <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] absolute text-4xl text-white top-10 right-[5%] ri-close-fill cursor-pointer"
        ></Link>
      <img className="w-[40%] object-cover" src={gif} alt="" />
    </div>
  );
};

export default Notfound;
