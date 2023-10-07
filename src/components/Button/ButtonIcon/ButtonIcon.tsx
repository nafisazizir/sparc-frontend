import React, { ReactNode } from "react";

interface ButtonIconProps {
  icon: ReactNode;
  onClick?: () => void;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, onClick }) => {
  return <button onClick={onClick}>{icon}</button>;
};

export default ButtonIcon;
