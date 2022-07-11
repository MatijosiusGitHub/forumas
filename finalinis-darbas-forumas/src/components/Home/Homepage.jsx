import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const HomePage = ({ setLoggedIn, loggedIn }) => {
  // const navigate = useNavigate();
  useEffect(() => {
    fetch("/verifyToken", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.verify === false) {
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
        }
      });
  }, []);

  return (
    <>
      {loggedIn ? (
        <div>
          <h1>pasijunges</h1>
        </div>
      ) : (
        <div>
          <h1>atsijunges</h1>
        </div>
      )}
    </>
  );
};
export default HomePage;
