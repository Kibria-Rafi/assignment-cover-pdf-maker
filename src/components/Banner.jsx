import { Link } from "react-scroll";
import { TypeAnimation } from "react-type-animation";
const Banner = () => {
    return (
        <section className="section" id="home">
            <div className="container mx-auto">
                <div>
                      {/* text */}
                      <div className="mx-5">
                        <h1 className="text-xl font-semibold text-white">
                            CREATE <span>YOUR</span>
                            </h1>
                            <div className="mb-6 text-2xl lg:text-5xl font-sans font-semibold leading-[1]">
                                <span className="mr-4 text-white">OWN</span>
                                <TypeAnimation sequence={[
                                    'ASSIGNMENT COVERPAGE',
                                    2000,
                                    'LAB COVERPAGE',
                                    2000,
                                ]}
                                speed={50}
                                className="text-purple-600"
                                wrapper="span"
                                repeat={Infinity} />
                            </div>
                            <p className="font-semibold text-white">You can easily make your cover page from our web application.
                                I think this is the best platform for make your cover page.
                            </p>
                      </div>
                      <Link to="pdf">
                      <button className="px-5 py-3 ms-5 bg-purple-700 rounded-2xl mt-5 font-bold">Get Started</button>
                      </Link>
                </div>
               <div className="">
               <img className="h-96 mt-5 mx-auto lg:mx-5 rounded-3xl shadow-2xl " src="https://i.ibb.co/Sdrx3hs/Picsart-24-02-25-05-12-47-714.png" alt="" />
               </div>
            </div>
        </section>
    );
};

export default Banner;