import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncLoadMovie, removeMovie } from "../../store/actions/movieActions";
import Loading from "../Loading";
import HorizontalCard from "./HorizontalCard";

const MovieDetails = () => {
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.movie);
  console.log("Movie Info:", info);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncLoadMovie(id));
    return () => {
      dispatch(removeMovie());
    };
  }, [id]);
  return info ? (
    <div
      className="w-full h-full px-[10%] relative"
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original${
          info.details.backdrop_path || info.details.profile_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* part-1 Navigation  */}
      <nav className="w-full text-zinc-100 flex h-[10vh] gap-10 text-2xl mt-5">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
        ></Link>
        <a target="_blank" href={info.details.homepage}>
          <i className="ri-external-link-fill hover:text-[#6556CD]"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="hover:text-[#6556CD] ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          className="hover:text-[#6556CD]"
        >
          imdb
        </a>
        <Link to="/" >
        <i className="ri-home-2-line hover:text-[#6556CD]"></i>
        </Link>
      </nav>

      {/* part-2 Movie poster and details */}
      <div className="w-full flex ">
        <img
          className=" h-[60vh] rounded-md object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
          src={`https://image.tmdb.org/t/p/original${
            info.details.poster_path || info.details.backdrop_path
          }`}
          alt="poster image"
        />
        <div className="content ml-[5%] text-white">
          <h1 className="text-5xl font-black ">
            {info.details.title ||
              info.details.name ||
              info.details.original_name ||
              info.details.original_title}
            <small>({info.details.release_date.split("-")[0]})</small>
          </h1>
          <div className="flex  items-center  gap-x-5  mt-3 mb-5">
            <span className=" text-white rounded-full bg-[#cda932] w-[7vh] h-[7vh] flex justify-center items-center">
              {(info.details.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="text-3xl w-[60px] leading-7 font-semibold ">
              User Score
            </h1>
            <h1>{info.details.release_date}</h1>
            <h1>{info.details.genres.map((g) => g.name).join(" |  ")}</h1>
          </div>

          <h1 className="text-2xl font-semibold italic ">
            {info.details.tagline}
          </h1>

          <h1 className="text-xl mb-3">Overview</h1>
          <p>{info.details.overview}</p>

          <h1 className="text-xl mb-3 mt-5">Movie Translations</h1>
          <p className="mb-10">{info.translations.join(", ")}</p>

          <Link
            className=" p-5  bg-[#6556CD] rounded-lg justify-center items-center"
            to={`${pathname}/trailer`}
          >
            <i className="text-2xl  mr-2 ri-play-fill"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* part 3 available on platforms */}
      <div className="w-[80%] flex  flex-col gap-y-5 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on flatrate</h1>

            {info.watchproviders.flatrate.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}}`}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Rent</h1>

            {info.watchproviders.rent.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}}`}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available to buy</h1>

            {info.watchproviders.buy.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={i}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* part4 Recommendations & similarity */}
      <hr className="mt-10 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-3xl font-bold mt-10 text-white ">
        Recommendation & Similar
      </h1>

      <HorizontalCard
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
