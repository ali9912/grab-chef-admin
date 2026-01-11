import { ChevronDown, ChevronUp } from "lucide-react";

interface DownArrowButtonProps {
  onClick?: () => void;
  className?: string;
  active?: boolean;
}

const DownArrowButton = ({ onClick, className = "", active }: DownArrowButtonProps) => {
  return (
    <div 
      onClick={onClick} 
      className={`absolute right-[50%] bottom-0 transform translate-1/2 h-10 w-10 flex items-center justify-center bg-white border text-red-500 shadow-lg rounded-full cursor-pointer ${className}`}
    >
      {active ? <ChevronUp /> : <ChevronDown />}
    </div>
  );
};

export default DownArrowButton;
