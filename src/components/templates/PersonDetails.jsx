import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  asyncLoadperson,
  removeperson,
} from "../../store/actions/personsAction";
import Loading from "../Loading";
import HorizontalCard from "./HorizontalCard";
import Dropdown from "./Dropdown";

const PersonDetails = () => {
  const { info } = useSelector((state) => state.person);
  console.log("person Info:", info);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncLoadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="px-10 w-full mb-10 bg-[#1F1E24] h-full ">
      {/* part 1 navigation */}
      <nav className="w-full text-zinc-100 flex  gap-10 text-2xl mt-5 mb-4">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
        ></Link>
      </nav>

      <div className="w-full flex ">
        {/* part2 left poster and details */}
        <div className="w-[20%]">
          <img
            className=" h-[50vh] rounded-md object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            src={`https://image.tmdb.org/t/p/original${info.details.profile_path}`}
            alt="poster image"
          />
          <hr className="mt-10 border-none h-[2px]  bg-zinc-200" />
          <div className="text-white text-xl mt-3 flex gap-x-10">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="hover:text-[#6556CD] ri-earth-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="hover:text-[#6556CD] ri-facebook-circle-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="hover:text-[#6556CD] ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="hover:text-[#6556CD] ri-twitter-x-fill"></i>
            </a>
          </div>

          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Personal info
          </h1>
          <h1 className=" text-zinc-400 font-semibold">Known for </h1>
          <h1 className="text-lg text-zinc-400">
            {info.details.known_for_department}
          </h1>
          <h1 className=" text-zinc-400 font-semibold mt-3"> Gender </h1>
          <h1 className="text-lg text-zinc-400">
            {info.details.gender === 2 ? "Male" : "Female"}
          </h1>
          <h1 className=" text-zinc-400 font-semibold mt-3">Birthday </h1>
          <h1 className="text-lg text-zinc-400">{info.details.birthday}</h1>
          <h1 className=" text-zinc-400 font-semibold mt-3">Deathday </h1>
          <h1 className="text-lg text-zinc-400">
            {info.details.deathday ? info.details.deathday : "Still Alive"}
          </h1>
          <h1 className=" text-zinc-400 font-semibold mt-3">Place Of Birth </h1>
          <h1 className="text-lg text-zinc-400">
            {info.details.place_of_birth
              ? info.details.place_of_birth
              : "No Information"}
          </h1>
          <h1 className=" text-zinc-400 font-semibold mt-3">Also Known as</h1>
          <h1 className="text-lg text-zinc-400">
            {info.details.also_known_as
              ? info.details.also_known_as
              : "No Information"}
          </h1>
        </div>

        {/* part 3 right details and information */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-6xl font-black text-zinc-400 my-5">
            {info.details.name}
          </h1>
          <h1 className=" text-zinc-400 text-xl font-semibold">Biography </h1>
          <p className="text-zinc-400 mt-3">{info.details.biography}</p>
          <h1 className="text-lg font-black text-zinc-400 mt-5">Known For</h1>

          <HorizontalCard data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h1>

            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5">
            {info[category + "Credits"].cast.map((c, i) => (
              <li key={i} className="hover:text-white p-5">
                <Link to={`/${category}/details/${c.id}`}>
                  <span>
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className="block ml-5">
                    {c.character &&
                      `Character Name:
                    ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
