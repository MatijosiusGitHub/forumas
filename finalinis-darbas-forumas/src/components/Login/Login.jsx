import "./log.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser, setLoggedIn }) => {
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();
    const user = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    await fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) return alert(data.err);
        setUser(data);
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="mainLoginDiv">
      <h1>Log in your self</h1>
      <form onSubmit={addUser}>
        <label htmlFor="username">Enter your username</label> <br />
        <input type="text" placeholder="Username" name="username" /> <br />
        <label htmlFor="password">Enter your password</label> <br />
        <input type="password" placeholder="Password" name="password" /> <br />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};
export default Login;
