import { forwardRef } from "react";
import { useTheme } from "../../lib/ThemeProvider";
import { TbBrightnessDown } from "react-icons/tb";
import { FaRegMoon } from "react-icons/fa";

export const ThemeToggle = forwardRef<HTMLButtonElement>((_, ref) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      ref={ref}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      onClick={toggleTheme}
      className="bg-gradient-to-b from-[#eec47b] to-[#f9574c] dark:from-[#aba3fc] dark:to-[#0a0a0a] text-white outline-none border-none bg-background h-10 w-10 grid place-content-center rounded-full"
    >
      {theme === "light" ? (
        <FaRegMoon className="text-xl leading-none" aria-hidden="false" />
      ) : (
        <TbBrightnessDown
          className="text-2xl leading-none"
          aria-hidden="false"
        />
      )}
    </button>
  );
});
