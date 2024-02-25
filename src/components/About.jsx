import { FaGithub } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";


const About = () => {
    return (
        <div className="section" id="about">
            {/* component */}
            <div className="section mx-auto flex flex-col items-center justify-center h-full ">
            <div className=" p-3 rounded-lg shadow-xl pb-8">
               
                <div className="flex flex-col items-center ">
                    <img src="https://i.ibb.co/twRd8cv/123581729.jpg" className="w-40 border-4 border-white rounded-full" alt="Profile" />
                    <div className="flex items-center space-x-2 mt-2">
                        <p className="text-2xl text-white">Kibria Rafi</p>
                        <span className="bg-blue-500 rounded-full p-1" title="Verified">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </span>
                    </div>
                    <p className="text-center">Studying BSC in Computer Science and Engineering at Daffodil International University. </p>
                    <p className="text-sm text-center">Daffodil Smart city, Birulia, Savar, Dhaka</p>
                </div>
                <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                    <div className="flex items-center space-x-4 mt-2">
                        <a href="https://github.com/kibria-Rafi">
                        <button className="flex items-center bg-purple-800 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                        <FaGithub />
                            <span>Github</span>
                        </button>
                        </a>
                        <a href="https://www.facebook.com/rafi.kibria0/">
                        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                        <FaFacebookMessenger />
                            <span>Facebook</span>
                        </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className="my-4 flex  ">
                <div className="w-full  ">
                    <div className="flex-1  rounded-lg shadow-2xl p-3">
                        <h4 className="text-xl text-center font-bold">Personal Info</h4>
                        <ul className="mt-2 ">
                            <li className="flex border-y py-2">
                                <span className="font-bold   w-24">Full name:</span>
                                <span className="font-bold">G.M. Kibria Rafi</span>
                            </li>
                            
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24 ">Occupation:</span>
                                <span className="font-bold">Web Application Developer</span>
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24 ">Location:</span>
                                <span className="font-bold">Daffodil Smart City</span>
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24 ">Email:</span>
                                <span className="font-bold">kibriarafi.bd.natore@gmail.com</span>
                            </li>
                            <li className="flex border-b py-2">
                                <span className="font-bold w-24 ">Phone:</span>
                                <span className="font-bold">+88 01407638740</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default About;
