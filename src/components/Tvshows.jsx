import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Tv = () => {
  document.title = "Movie Browser | Tv shows ";
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [Tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      console.log(data);
      if (data.results.length > 0) {
        setTv((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandle = async () => {
    if (Tv.length === 0) {
      GetTv();
    } else {
      setPage(1);
      setTv([]);
      GetTv();
    }
  };

  useEffect(() => {
    refreshHandle();
  }, [category]);

  return Tv.length > 0 ? (
    <div className=" w-screen h-screen   ">
      <div className="w-full flex items-center justify-between px-[3%]">
        <h1 className="text-3xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          ></i>
          TvShows<small className="text-md ml-2 text-zinc-500 ">({category})</small>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["on_the_air","popular","top_rated","airing_today"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={Tv.length}
        next={GetTv}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Cards data={Tv} title="tv"/>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Tv;
