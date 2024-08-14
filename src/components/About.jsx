import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const About = () => {
  const navigate = useNavigate();

  const testimonials = [
    {
      quote:
        "Movie Browser has completely changed the way I discover new movies. The curated recommendations are spot-on.",
      author: "Alex J.",
    },
    {
      quote:
        "I love the variety of movies available on Movie Browser. There's always something new to watch!",
      author: "Maria S.",
    },
    {
      quote:
        "The user interface is so intuitive and easy to use. Movie Browser is my go-to platform for movie nights.",
      author: "John D.",
    },
    {
      quote:
        "I've been using Movie Browser for a few months now. Highly recommended!",
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full h-full bg-gray-900 text-white">
      {/* Header Section */}
      <div className="m-4  rounded-full p-3 flex items-center justify-between">
        <i
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] text-white text-4xl ri-arrow-left-line cursor-pointer"
        ></i>

        <h1 className="text-3xl text-white font-bold tracking-wider md:text-4xl mx-auto">
          About Us
        </h1>
      </div>

      {/* Main Content Section with Background Image */}
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://media.istockphoto.com/id/1542598409/photo/movie-podium-background-with-movie-objects-3d-rendering.webp?b=1&s=170667a&w=0&k=20&c=VUwlXnJCjj7A811-dxcwhb9gZ-yp48ymZ2Jmm4lOlto=')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative h-[50vh] w-full overflow-hidden"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-widest animate-pop-up">
          Movie Browser
          </h1>
          <h3 className="text-3xl md:text-5xl mt-4 italic font-semibold animate-fade-in">
            <span className="text-yellow-400 animate-pulse ">Bringing!</span>{" "}
            the Magic of Movies to You
          </h3>
        </div>
      </div>

      {/* Description Section */}
      <div className=" flex p-20">
        <div className="w-[20%]">
          <img src="/camera.png" alt="" className="animate-scale-up" />
        </div>
        <div className="w-[80%] md:w-[70%] mx-auto  p-6  rounded-xl border-gray-600 flex items-center justify-center">
          <p className="text-lg md:text-2xl text-gray-300 text-center ">
            <span className="text-[#6556CD] font-bold text-3xl">Movie Browser</span>{" "}
            is your go-to destination for discovering the best movies and TV
            shows. Our mission is to bring you closer to the entertainment you
            love with an easy-to-use platform and curated recommendations.
          </p>
        </div>
      </div>

      {/* core values section */}
      <div className="bg-gray-900 py-7 ">
        <div className="max-w-6xl mx-auto border-2 border-zinc-400 p-4 rounded-2xl px-4 shadow-lg" >
          <h2 className="text-3xl md:text-4xl font-bold text-[#6556CD] mb-8 text-center">
            Our Core Values
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full md:w-1/3 text-center">
              <img
                src="/inno.png"
                alt="Innovation"
                className="w-18 h-20 mx-auto mb-4"
              />
              <h3 className="text-3xl font-semibold text-white">Innovation</h3>
              <p className="text-gray-400">
                We constantly strive to bring new ideas and improvements.
              </p>
            </div>
            <div className="w-full md:w-1/3 text-center">
              <img
                src="/customer.png"
                alt="Customer Focus"
                className="w-18 h-20 mx-auto mb-4"
              />
              <h3 className="text-3xl font-semibold text-white">
                Customer Focus
              </h3>
              <p className="text-gray-400">
                Our users are at the heart of everything we do.
              </p>
            </div>
            <div className="w-full md:w-1/3 text-center">
              <img
                src="/honesty.png"
                alt="Integrity"
                className="w-18 h-20 mx-auto mb-4"
              />
              <h3 className="text-3xl font-semibold text-white">Integrity</h3>
              <p className="text-gray-400">
                We operate with transparency and honesty.
              </p>
            </div>
            <div className="w-full md:w-1/3 text-center">
              <img
                src="/passion.png"
                alt="Passion"
                className="w-18 h-20 mx-auto mb-4"
              />
              <h3 className="text-3xl font-semibold text-white">Passion</h3>
              <p className="text-gray-400">
                We are passionate about movies and delivering the best
                experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="mt-32 py-10 ">
        <div className="max-w-6xl mx-auto px-20">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
            Testimonials
          </h1>
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className=" p-10 rounded-xl shadow-lg bg-[#361373]"
              >
                <p className="text-xl text-gray-200">{testimonial.quote}</p>
                <p className="mt-4 text-indigo-300 font-semibold">
                  - {testimonial.author}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default About;
