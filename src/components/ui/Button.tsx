import { Loader2 } from "lucide-react";
import { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline" | "dark" | "ghost";
  size?: "small" | "large";
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "filled", // Default to filled style
  size = "large", // Default to large size
  loading = false,
  className = "",
  ...props
}) => {
  const sizeStyles =
    size === "large"
      ? "h-12 sm:h-14 text-base sm:text-xl px-6 sm:px-10"
      : "h-11 text-sm px-6";

  const variantStyles = (() => {
    switch (variant) {
      case "filled":
        return "bg-primary-300 hover:bg-primary-400 text-white border-none";
      case "outline":
        return "bg-transparent hover:bg-white/10 border border-white text-white";
      case "dark":
        return "bg-transparent hover:bg-white/10 border border-white text-white";
      case "ghost":
        return "bg-transparent hover:bg-black/10 dark:hover:bg-white/10 border border-black/20 dark:border-white/20 text-black dark:text-white";
      default:
        return ""; // Fallback to avoid unexpected cases
    }
  })();

  return (
    <button
      className={`relative flex items-center justify-center gap-2 font-medium rounded-full cursor-pointer leading-none transition-all duration-300 ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
      {loading && (
        <div className="absolute inset-0 text-sm grid place-content-center">
          <Loader2 className="origin-center size-5 animate-spin" />
        </div>
      )}
    </button>
  );
};

export default Button;
