import "./log.css";

const Login = () => {
  return (
    <div className="mainLoginDiv">
      <h1>Log in your self</h1>
      <form>
        <label htmlFor="">Enter your username</label> <br />
        <input type="text" name="username" /> <br />
        <label htmlFor="">Enter your password</label> <br />
        <input type="password" name="password" />
      </form>
      <button type="submit">Log in</button>
    </div>
  );
};
export default Login;
