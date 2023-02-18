import { Link } from "react-router-dom";
import "./Button.css";
const Button = ({ children, to, href, onClick, className, danger }) => {
  if (href) {
    return (
      <a href={href} className="button">
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} className="button">
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`button ${className} ${danger ? "danger" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
