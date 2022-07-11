import "./reg.css";

const Regsiter = ({ addUser }) => {
  return (
    <div className="mainRegistrationDiv">
      <h1>Sign Up</h1>
      <form onSubmit={addUser}>
        <label htmlFor="name">Enter your name</label> <br />
        <input type="text" name="name" placeholder="Bill" /> <br />
        <label htmlFor="surname">Enter your surname</label> <br />
        <input type="text" name="surname" placeholder="Gates" /> <br />
        <label htmlFor="username">Enter your username </label> <br />
        <input type="text" name="username" placeholder="pinkFairy" /> <br />
        <label htmlFor="age">Enter your age</label> <br />
        <input type="number" name="age" placeholder="18" /> <br />
        <label htmlFor="email">Enter your email</label> <br />
        <input type="email" name="email" placeholder="someMail@mail.com" />
        <br />
        <label htmlFor="password">Enter your password</label> <br />
        <input
          type="password"
          name="password"
          placeholder="RealyG00dPass"
        />{" "}
        <br />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};
export default Regsiter;
