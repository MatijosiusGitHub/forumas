import "./Register.css";

const Regsiter = () => {
  return (
    <div className="mainRegistrationDiv">
      <h1>Sign Up</h1>
      <form>
        <label htmlFor="name">Enter your name</label> <br />
        <input type="text" name="name" /> <br />
        <label htmlFor="surname">Enter your surname</label> <br />
        <input type="text" name="surname" /> <br />
        <label htmlFor="age">Enter your age</label> <br />
        <input type="number" name="age" /> <br />
        <label htmlFor="email">Enter your email</label> <br />
        <input type="email" name="email" /> <br />
        <label htmlFor="password">Enter your password</label> <br />
        <input type="passwors" name="password" /> <br />
        <button>Sign up</button>
      </form>
    </div>
  );
};
export default Regsiter;
