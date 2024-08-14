import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Notfound from "../Notfound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  return ytvideo ? (
    <div className=" absolute top-0 left-0 bg-[rgba(0,0,0,.8)] w-full h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="hover:text-[#6556CD] absolute text-4xl text-white top-10 right-[5%] ri-close-fill cursor-pointer"
      ></Link>
      <ReactPlayer
        controls
        autoplay
        playing={true}
        height={600}
        width={1220}
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
      />
    </div>
  ) : (
    <Notfound />
  );
};

export default Trailer;
