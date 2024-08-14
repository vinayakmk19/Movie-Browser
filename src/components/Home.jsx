import axios from "../utils/axios";
import Header from "./templates/Header";
import Sidebar from "./templates/Sidebar";
import Topnav from "./templates/Topnav";
import HorizontalCards from "./templates/HorizontalCard";
import { useEffect, useState } from "react";
import Dropdown from "./templates/Dropdown";
import Loading from "./Loading";

const Home = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const GetWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);

      setTrending(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    !wallpaper && GetWallpaper();
    GetTrending();
  }, [category]);

  return wallpaper && trending ? (
    ((document.title = "Movie Browser | Home"),
    (
      <>
        <Sidebar />
        <div className="md:w-[80%] w-full h-full overflow-auto overflow-x-hidden ">
          <Topnav />
          <Header data={wallpaper} />

          <div className=" flex justify-between p-4 items-center">
            <h1 className="md:text-4xl text-3xl mr-10 font-semibold text-zinc-400">
              Trending
            </h1>
            <Dropdown
              title="Filter"
              options={["tv", "movie", "all"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <HorizontalCards data={trending} function={setCategory} />
        </div>
      </>
    ))
  ) : (
    <Loading />
  );
};

export default Home;
