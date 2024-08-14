import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[20%] h-full  border-r-2 border-zinc-400 p-10 hidden  md:block">
      <h1 className="items-center text-2xl font-bold text-white">
        <i className="ri-tv-fill mr-2 text-[#6556CD] text-3xl"></i>
        <span className="text-3xl">Movie Browser</span>
      </h1>

      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          News Feed
        </h1>
        <Link to="/trending" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-fire-fill mr-2 "></i>
          <span>Trending</span>
        </Link>
        <Link to="/popular" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-bard-fill mr-2 "></i>
          <span>Popular</span>
        </Link>
        <Link to="/movie" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-movie-2-fill mr-2 "></i>
          <span>Movies</span>
        </Link>
        <Link to="/tv" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-tv-2-fill mr-2 "></i>
          <span>Tv shows</span>
        </Link>
        <Link to="/person" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-team-fill mr-2 "></i>
          <span>People</span>
        </Link>
      </nav>

      <hr className="h-[1px] border-none bg-zinc-400 my-2" />

      <nav className="flex flex-col text-zinc-400 text-xl">
        <h1 className="text-white font-semibold text-xl mt-10 mb-4">
          Website information
        </h1>
        <Link to="/about" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-information-fill mr-2 "></i>
          <span>About</span>
        </Link>
       
      </nav>
    </div>
  );
};

export default Sidebar;
