import { cn } from "@/lib/utils";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
};

export default function IconButton({
  onClick,
  children,
  isActive,
  disabled,
}: Props) {
  return (
    <button
      className={cn(
        "w-10 h-10 flex items-center shadow-none rounded-lg justify-center border-0 hover:bg-gray-100 transition-all duration-300",
        isActive && "bg-blue-50 border-4 text-sky-500 "
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
