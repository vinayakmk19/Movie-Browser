import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  document.title = "Movie Browser | person";
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setperson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      console.log(data);
      if (data.results.length > 0) {
        setperson((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandle = async () => {
    if (person.length === 0) {
      GetPerson();
    } else {
      setPage(1);
      setperson([]);
      GetPerson();
    }
  };

  useEffect(() => {
    refreshHandle();
  }, [category]);

  return person.length > 0 ? (
    <div className=" w-screen h-screen">
      <div className="w-full flex items-center justify-between px-[3%]">
        <h1 className="text-3xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          ></i>
          Person<small className="text-md ml-2 text-zinc-500 ">({category})</small>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />

          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={GetPerson}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Cards data={person} title="person"/>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
