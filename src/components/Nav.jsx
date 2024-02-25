import { LuHome } from "react-icons/lu";
import { FaRegFilePdf } from "react-icons/fa6";
import { GrContactInfo } from "react-icons/gr";
import { FaBloggerB } from "react-icons/fa";
import { Link } from "react-scroll";

const Nav = () => {
  return (
    <nav className="fixed bottom-2 lg:bottom-8 w-full overflow-hidden z-50">
      <div className="container mx-auto">
        <div className="w-full bg-black/20 h-[96px] backdrop-blur-2xl rounded-full max-w-[460px] mx-auto px-5 flex text-white justify-between items-center">
          <Link
            activeClass="active"
            smooth={true}
            spy={true}
            offset={-200}
            to="home"
            className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center"
          >
            <LuHome />
          </Link>
          <Link
            activeClass="active"
            smooth={true}
            spy={true}
            to="pdf"
            className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center"
          >
            <FaRegFilePdf />
          </Link>
          <Link
            activeClass="active"
            smooth={true}
            spy={true}
            to="blog"
            className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center"
          >
            <FaBloggerB />
          </Link>
          <Link
            activeClass="active"
            smooth={true}
            spy={true}
            to="about"
            className="cursor-pointer w-[60px] h-[60px] flex items-center justify-center"
          >
            <GrContactInfo />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
