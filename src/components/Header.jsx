


const Header = () => {
    return (
        <div >
          <div className="navbar bg-black/20 shadow-lg">
  <div className="flex-1">
    <a className="text-2xl font-bold text-blue-500"><span className="text-purple-700 text-2xl">COVER</span><span className="text-xl text-white">BUILDER</span> </a>
  </div>
  <div className="flex-none gap-2 lg:gap-10">
    
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
     
    </div>
  </div>
</div>
        </div>
    );
};

export default Header;