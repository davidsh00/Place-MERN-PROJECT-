import "./LoadingSpinner.css";

const LoadingSpinner = ({ overlay }) => {
  return (
    <div className={`loading-wrapper ${overlay ? "overlay" : ""}`}>
      <div className="loading-spinner"></div>
    </div>
  );
};
export default LoadingSpinner;
