import React from "react";
import Button from "../Button/Button/Button";
import Logo from "../../assets/logo.svg?react";
import "./style.css";

interface ModalProps {
  title: string;
  subtitle: string;
  buttonLabel?: string;
  onClick?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  subtitle,
  buttonLabel,
  onClick,
}) => {
  return (
    <div className="modal-container">
      <div className="rounded-lg px-6 py-8 w-3/4 bg-white flex flex-col items-center gap-8 text-center">
        <Logo />

        <div className="flex flex-col items-center gap-3">
          <div className="text-sm font-bold text-center">{title}</div>
          <div className="text-sm text-center">{subtitle}</div>
        </div>

        {buttonLabel && onClick && (
          <Button label={buttonLabel} onClick={onClick} size="small" />
        )}
      </div>
    </div>
  );
};

export default Modal;
