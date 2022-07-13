import { useEffect } from "react";
import "./Home.css";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const HomePage = ({
  setLoggedIn,
  loggedIn,
  dataQuestion,
  dataAnswers,
  setUser,
  user,
  dataUsers,
}) => {
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
          setUser({ username: data.username, id: data.id });
        }
      });
  }, []);
  return (
    <>
      {loggedIn ? (
        <div className="mainHomeDiv">
          <div className="welcomeDiv">
            <h1>Welcome back, {user.username}</h1>
            <Link to={"/ask"}>
              <button>Ask question</button>
            </Link>
          </div>
          {dataQuestion.map((question, id) => (
            <div className="questionDiv" key={id}>
              <h1>{question.question}</h1>
              <div>
                {dataAnswers
                  .filter((answer) => {
                    return answer.question_id === question.id;
                  })
                  .map((answer, i) => {
                    return (
                      <div key={i}>
                        <div></div>
                        <p>
                          <span style={{ fontWeight: "bold" }}>
                            {dataUsers
                              .filter((username) => {
                                return username.id === answer.user_id;
                              })
                              .map((username) => username.username)}
                            :
                          </span>{" "}
                          {answer.answer}{" "}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
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
