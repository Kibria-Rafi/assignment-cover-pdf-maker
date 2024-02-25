import About from "./components/About";
import Banner from "./components/Banner";
import Blog from "./components/Blog";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Pdf from "./components/Pdf";


const App = () => {
  return (
    <div style={{ backgroundImage: `url('https://i.ibb.co/87MY2J2/site-bg.jpg')` }}  className="  bg-no-repeat bg-cover overflow-hidden "  >
      <Header></Header>
      <Banner></Banner>
      <Pdf></Pdf>
      <Blog/>
      <About></About>
      <Nav></Nav>
      <div className='h-full'></div>
    </div>
  );
};

export default App;