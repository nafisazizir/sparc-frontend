import React, { ReactNode } from "react";

interface ButtonProps {
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  secondary?: boolean
}

const Button: React.FC<ButtonProps> = ({
  icon,
  label,
  onClick,
  size = "medium",
  secondary = false
}) => {
  const buttonSizeClasses = {
    small: "py-2 px-4 text-sm",
    medium: "py-2 px-8",
    large: "py-2 px-8 text-lg",
  };

  return (
    <button
      className={`flex items-center 
      ${secondary 
        ? "bg-white text-jordy-blue-500 border border-jordy-blue-500  hover:bg-opacity-75" 
        : "bg-jordy-blue-500 hover:bg-jordy-blue-700 text-white "}
      
      rounded-full ${buttonSizeClasses[size]}`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default Button;
