import { Link } from "react-router-dom";
import noImage from "/noimage.jpg";

const Cards = ({ data,title }) => {
  console.log(data);
  
  console.log(title);
  return (
    <div className="flex flex-wrap justify-center gap-10 p-2 w-full h-full bg-[#1F1E24]   ">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          key={i}
          className="relative w-[300px] h-[450px] bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
        >
          <img
            className="w-full h-3/4 object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            src={c.profile_path || c.backdrop_path || c.poster_path?`https://image.tmdb.org/t/p/original${
              c.profile_path || c.backdrop_path || c.poster_path
            }`:noImage}
            alt="poster image"
          />
          <div className="p-4">
            <h1 className="text-xl font-semibold text-white text-center">
              {c.name || c.title || c.original_name || c.original_title}
            </h1>
          </div>
          {c.vote_average && (
            <div className="absolute right-1 text-xl bottom-[30%] text-white rounded-full bg-[#cda932] w-[7vh] h-[7vh] flex justify-center items-center">
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
