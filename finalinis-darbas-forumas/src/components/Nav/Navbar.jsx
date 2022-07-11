import "./nav.css";
import Logo from "../smallComponents/Logo";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Logo />
      </Link>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Sign up</button>
        </Link>
      </div>
    </nav>
  );
};
export default Nav;
