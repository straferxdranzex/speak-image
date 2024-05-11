import React from "react";
import FormCard from "../Components/FormCard/FormCard";

const SignUp: React.FC = () => {
  const handleSignUp = () => {};

  return (
    <div className="sigup-container">
      <FormCard
        title="Create an account"
        inputFields={[
          { label: "Full Name", placeholder: "John Smith", type: "text" },
          { label: "Email", placeholder: "example@example.com" },
          { label: "Password", placeholder: "Password", type: "password" },
          {
            label: "Confirm Password",
            placeholder: "Password",
            type: "password",
          },
        ]}
        buttonText="Sign Up"
        onButtonClick={handleSignUp}
        extraText="Already have an account?"
        extraLinkText="Login"
        extraLinkUrl="/login"
      />
    </div>
  );
};

export default SignUp;
