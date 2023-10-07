import Logo from "../../assets/logo.svg?react";

const Navbar = () => {
  return (
    <nav className="h-12 bg-slate-300 flex justify-between items-center shadow-2xl px-3">
      <div>
        <Logo />
      </div>
      <div>kanan</div>
    </nav>
  );
};

export default Navbar;
