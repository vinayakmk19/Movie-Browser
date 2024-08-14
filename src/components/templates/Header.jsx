
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original${
          data.backdrop_path || data.profile_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[55vh] flex flex-col justify-end items-start p-[5%]  "
    >
      <h1 className="text-white font-black md:text-5xl text-xl">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="md:w-2/3 w-full text-xs md:text-base  mt-3 text-white">
        {data.overview.slice(0, 200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-300">more</Link>
      </p>
      <p className="text-white ">
        <i className="text-yellow-500 ri-megaphone-line mr-2"></i>
        {data.release_date || "No information"} 
        <i className="text-yellow-500 ml-5 mr-2 ri-album-fill"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="mt-5 bg-[#6556CD] p-4 rounded text-white">
      Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
