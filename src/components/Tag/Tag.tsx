import React from "react";

interface TagProps {
  text: string;
  variant?: "info" | "warning" | "error";
}

const Tag: React.FC<TagProps> = ({ text, variant = "info" }) => {
  let tagColorClasses = "";

  if (variant === "info") {
    tagColorClasses = "bg-jordy-blue-800 text-white";
  } else if (variant === "warning") {
    tagColorClasses = "bg-yellow-500 text-white";
  } else if (variant === "error") {
    tagColorClasses = "bg-red-500 text-white";
  }

  return (
    <div
      className={`inline-block py-1 px-3 rounded-full text-xs ${tagColorClasses}`}
    >
      {text}
    </div>
  );
};

export default Tag;
