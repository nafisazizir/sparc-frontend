import Logo from "../../assets/logo.svg?react";
import Info from "../../assets/info.svg?react";
import ButtonIcon from "../Button/ButtonIcon/ButtonIcon";

const Navbar = () => {
  return (
    <nav className="h-12 flex justify-between items-center shadow-md px-3">
      <div className="flex flex-row items-center gap-3">
        <Logo />
        <div className="font-bold">SPARC</div>
      </div>
      <div className="flex flex-row items-center gap-3">
        <ButtonIcon icon={<Info />} onClick={() => ""} />
      </div>
    </nav>
  );
};

export default Navbar;
