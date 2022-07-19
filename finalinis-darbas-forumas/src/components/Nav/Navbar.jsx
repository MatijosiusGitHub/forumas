import "./nav.css";
import Logo from "../smallComponents/Logo";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Nav = ({ loggedIn, setLoggedIn, user }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
  };
  return (
    <>
      {loggedIn ? (
        <nav>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo />
          </Link>
          <div>
            <Link to="/user">
              <button>{user.username}</button>
            </Link>
            <button onClick={logout}>Logout</button>
          </div>
        </nav>
      ) : (
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
      )}
    </>
  );
};
export default Nav;
