import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./Heropage.css";
import { useNavigate } from "react-router-dom";

const HeroLmsSystem = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  return (
    <div className="hero-image ">
      <div className="   h-full bg-gradient-to-b mt-10">
        <section className=" sm:py-16 ">
          <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-16">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h1 className="text-3xl leading-tight  font-bold text-text_color">
                  Crowdsource your needs with our borrowing platform. Share and
                  borrow items from a vibrant community of users today!
                </h1>
                <p className="mt-5 text-sm sm:text-lg text-text_color ">
                  Discover a sharing economy redefined. Our platform connects
                  users, enabling seamless borrowing and lending within a
                  dynamic community. Join us to unlock a world of collaborative
                  possibilities today!
                </p>
                <div className="mt-5 flex items-center gap-5 md:gap-0 sm:flex sm:items-center sm:space-x-20">
                  <button
                    className="inline-flex items-center rounded-3xl justify-center px-8 py-3 text-base  font-semibold text-white transition-all
                     duration-200 bg-primary   hover:bg-primary focus:bg-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({
                        top: document.querySelector("#products").offsetTop,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <Carousel
                  infiniteLoop={true}
                  showArrows={false}
                  autoPlay={true}
                  showStatus={false}
                  showThumbs={false}
                  showIndicators={false}
                >
                  <img
                    src={require("../../assets/stable-diffusion-xl (10).jpg")}
                    className="rounded-lg"
                    alt="ProductImage"
                  />
                  <img
                    src={require("../../assets/stable-diffusion-xl (11).jpg")}
                    className="rounded-lg"
                    alt="ProductImage"
                  />
                  <img
                    src={require("../../assets/stable-diffusion-xl (12).jpg")}
                    className="rounded-lg"
                    alt="ProductImage"
                  />
                  <img
                    src={require("../../assets/stable-diffusion-xl (13).jpg")}
                    className="rounded-lg"
                    alt="ProductImage"
                  />
                </Carousel>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default HeroLmsSystem;
