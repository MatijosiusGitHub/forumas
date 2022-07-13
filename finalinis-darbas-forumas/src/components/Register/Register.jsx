import "./reg.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();
    const user = {
      name: e.target.name.value,
      surname: e.target.surname.value,
      username: e.target.username.value,
      age: e.target.age.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    await fetch("/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(() => navigate("/login", { replace: true }))
      .catch((error) => console.log(error));
  };
  return (
    <div className="mainRegistrationDiv">
      <h1>Sign Up</h1>
      <form onSubmit={addUser}>
        <label htmlFor="name">Enter your name</label> <br />
        <input type="text" name="name" placeholder="Bill" required /> <br />
        <label htmlFor="surname">Enter your surname</label> <br />
        <input type="text" name="surname" placeholder="Gates" required /> <br />
        <label htmlFor="username">Enter your username </label> <br />
        <input
          type="text"
          name="username"
          placeholder="pinkFairy"
          required
        />{" "}
        <br />
        <label htmlFor="age">Enter your age</label> <br />
        <input type="number" name="age" placeholder="18" required /> <br />
        <label htmlFor="email">Enter your email</label> <br />
        <input
          type="email"
          name="email"
          placeholder="someMail@mail.com"
          required
        />
        <br />
        <label htmlFor="password">Enter your password</label> <br />
        <input
          type="password"
          name="password"
          placeholder="RealyG00dPass"
          min="6"
        />{" "}
        <br />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};
export default Register;
