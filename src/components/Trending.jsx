import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";


const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "Movie Browser | Trending  ";
  

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if(data.results.length >0){
        setTrending((prev) => [...prev, ...data.results]);
        setPage(page+1)
      }else{
        sethasMore(false)
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const refreshHandle=async()=>{
    if(trending.length === 0){
      GetTrending()
    }else{
      setPage(1)
      setTrending([])
      GetTrending()
    }
  }


  useEffect(() => {
   refreshHandle()
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className=" w-screen h-screen   ">
      <div className="w-full flex items-center justify-between px-[3%]">
        <h1 className="text-3xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          ></i>
          Trending
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length} 
        next={GetTrending}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
