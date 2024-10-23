import { Link } from "react-router-dom";
import { Input } from "./Input";
import { Switch } from "./Switch";
import { Loader2 } from "lucide-react";

interface InputField {
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  forgotPassword?: boolean;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ariaLabel?: string; // For aria-label
  ariaDescribedby?: string; // For aria-describedby
}

interface LoginSignupCardProps {
  title: string;
  subtitle: string;
  inputFields: InputField[];
  buttonText: string;
  onSubmit: (e: React.FormEvent) => void;
  handleSwitchChange: () => void;
  btnLoading?: boolean;
  showSwitch?: boolean;
}

const FormCard: React.FC<LoginSignupCardProps> = ({
  title,
  subtitle,
  inputFields,
  buttonText,
  onSubmit,
  handleSwitchChange,
  btnLoading,
  showSwitch = false,
}) => {
  return (
    <section className="w-full flex flex-col px-6 items-center gap-[4vh] sm:gap-9">
      <header className="text-center flex flex-col text-foreground items-center justify-center">
        <h1 className="text-4xl font-semibold">{title}</h1>
        <p className="text-base font-normal sm:text-[1.125rem] leading-relaxed dark:text-primary-100">
          {subtitle}
        </p>
      </header>
      <form
        onSubmit={onSubmit}
        className="sm:m-10 sm:pb-8 flex flex-col gap-[4vh] sm:gap-9 justify-center flex-grow max-w-[18rem] sm:max-w-[25rem] w-full"
      >
        {inputFields.map((field, index) => (
          <div key={index}>
            <Input
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              type={field.type}
              value={field.value}
              onChange={field.onChange}
              aria-label={field.ariaLabel} // aria-label passed here
              aria-describedby={field.ariaDescribedby} // aria-describedby passed here
              aria-required={field.required}
            />
            {field.ariaDescribedby && (
              <p id={field.ariaDescribedby} className="sr-only">
                {field.ariaDescribedby}
              </p>
            )}
          </div>
        ))}
        {showSwitch && (
          <div className="flex items-center justify-between">
            <Switch defaultChecked onChange={handleSwitchChange} />
            <Link to="/forgot-password" className="hover:underline">
              <span className="text-sm">Forgot password?</span>
            </Link>
          </div>
        )}
        <button
          name={buttonText || " "}
          className="sm:mt-4 relative h-12 w-full sm:h-14 text-base sm:text-lg px-6 sm:px-10 flex items-center justify-center gap-2 font-normal rounded-xl cursor-pointer leading-none transition-all duration-300 bg-transparent hover:bg-foreground hover:text-background border border-black dark:border-primary-100 text-foreground"
          type="submit"
          disabled={btnLoading}
          aria-disabled={btnLoading}
        >
          {btnLoading ? (
            <Loader2 className="origin-center size-5 animate-spin" />
          ) : (
            buttonText || " "
          )}
        </button>
      </form>
    </section>
  );
};

export default FormCard;
