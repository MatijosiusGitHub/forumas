import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const HomePage = ({ setLoggedIn, loggedIn, data }) => {
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
        data.map((question, id) => (
          <div key={id}>
            <h1>{question.question}</h1>
          </div>
        ))
      ) : (
        <div>
          <h1>atsijunges</h1>
        </div>
      )}
    </>
  );
};
export default HomePage;
