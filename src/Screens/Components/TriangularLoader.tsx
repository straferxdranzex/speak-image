import { Triangle } from "react-loader-spinner";

export const TriangleLoader: React.FC = () => {
    return (
      <div className="blur-screen">
        <div className="loader-wrapper">
          <Triangle
            height="60"
            width="60"
            color="#ff8c00"
            visible={true} 
            ariaLabel="triangle-loading"
          />
        </div>
      </div>
    );
  };