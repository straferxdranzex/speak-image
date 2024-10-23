import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/Tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineMenu } from "react-icons/md";

// const contentVariants = {
//   open: { opacity: 1, x: 0 },
//   closed: { opacity: 0, x: -10 },
// };

interface OptionProps {
  Icon: React.ElementType;
  title: string;
  open: boolean;
  highlight?: boolean;
  href?: string;
  label?: string;
  onClick?: () => void;
}

export const Option: React.FC<OptionProps> = ({
  Icon,
  title,
  open,
  highlight = false,
  href,
  label,
  onClick,
}) => {
  const CommonContent = () => (
    <>
      <div
        className={`${
          highlight ? "text-primary-100 text-2xl" : "text-xl"
        } grid h-full w-10 place-content-center`}
        aria-hidden="true" // Decorative content, not needed for screen readers
      >
        <Icon />
      </div>
      <AnimatePresence>
        {open && (
          <motion.span
            // initial="closed"
            // animate="open"
            // exit="closed"
            // variants={contentVariants}
            // transition={{ duration: 0.2 }}
            className="text-xs font-medium relative"
            role="presentation" // Animation is purely presentational
          >
            <span
              className="top-1/2 -translate-y-1/2 left-0 absolute whitespace-nowrap"
              aria-hidden="true" // Span is not necessary for accessibility
            >
              {title}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        {href ? (
          <Link
            onClick={onClick}
            to={href}
            className={`${
              highlight
                ? "shadow-lg bg-black/5 dark:bg-white/5 border border-transparent hover:border-border hover:bg-card-hover"
                : "hover:bg-card-hover"
            } text-text-light relative px-1 flex h-11 w-full items-center rounded-lg transition-colors hover:text-foreground`}
            aria-label={title} // Accessible label for screen readers
          >
            <CommonContent />
          </Link>
        ) : (
          <motion.button
            onClick={onClick}
            className={`${
              highlight
                ? "shadow-lg bg-black/5 dark:bg-white/5 border border-transparent hover:border-border hover:bg-card-hover text-text-foreground"
                : "text-text-light hover:bg-card-hover"
            } relative px-1 flex h-11 w-full items-center rounded-lg transition-colors hover:text-foreground`}
            aria-label={title} // Accessible label for screen readers
          >
            <CommonContent />
          </motion.button>
        )}
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        <span role="tooltip">{!label ? title : label}</span>
      </TooltipContent>
    </Tooltip>
  );
};

interface ToggleCloseProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ToggleClose: React.FC<ToggleCloseProps> = ({ open, setOpen }) => {
  return (
    <motion.button
      onClick={() => setOpen((pv: any) => !pv)}
      className="hover:bg-card-hover dark:text-primary-100 relative flex px-1 h-11 w-full items-center rounded-md transition-colors"
      aria-expanded={open ? "true" : "false"}
      aria-controls="side-navbar"
      aria-label={open ? "Collapse menu" : "Expand menu"}
    >
      <div className="grid h-full w-10 place-content-center text-2xl">
        <MdOutlineMenu aria-hidden="true" />
      </div>
      <AnimatePresence>
        {open && (
          <motion.span
            // initial="closed"
            // animate="open"
            // exit="closed"
            // variants={contentVariants}
            // transition={{ duration: 0.2 }}
            className="text-base font-medium relative"
            id="menu-content"
          >
            <span
              className="top-1/2 -translate-y-1/2 left-0 absolute whitespace-nowrap"
              aria-hidden="true"
            >
              Speakimage
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
