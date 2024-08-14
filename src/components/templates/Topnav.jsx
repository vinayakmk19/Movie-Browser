import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const FetchSearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      FetchSearch();
    } else {
      setSearches([]);
    }
  }, [query]);

  return (
    <div className="w-full h-[10vh] relative justify-start ml-[15%] items-center flex z-10">
      <i className="ri-search-line text-3xl text-zinc-400"></i>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        className="md:w-[50%]  w-[60%] md:mx-10  p-3 bg-transparent border-none outline-none text-zinc-200"
        placeholder="Search anything here"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="ri-close-fill text-zinc-400 text-3xl"
        ></i>
      )}

      <div className="md:w-[55%] w-[80%] max-h-[50vh] bg-zinc-200 top-[100%] md:left-[5%]  absolute overflow-auto">
        {searches.length > 0
          ? searches.map((search, index) => (
              <Link
                to={`/${search.media_type}/details/${search.id}`}
                key={index}
                className="text-zinc-600 md:w-full   hover:text-black hover:bg-zinc-300 p-10 flex justify-start items-center border-b-2 border-zinc-100 duration-300"
              >
                <img
                  src={
                    search.backdrop_path || search.profile_path
                      ? `https://image.tmdb.org/t/p/original${
                          search.backdrop_path || search.profile_path
                        }`
                      : noimage
                  }
                  className="w-[11vh] h-[11vh] shadow-lg mr-10 object-cover rounded-md"
                  alt=""
                />
                <span>
                  {search.name ||
                    search.original_name ||
                    search.original_title ||
                    search.title}
                </span>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};

export default Topnav;
