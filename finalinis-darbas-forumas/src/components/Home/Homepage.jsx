import { useEffect } from "react";
import "./Home.css";
// import { useNavigate } from "react-router-dom";

const HomePage = ({ setLoggedIn, loggedIn, dataQuestion, dataAnswers }) => {
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
        <div className="mainHomeDiv">
          <h1>Frequently asked questions</h1>
          {dataQuestion.map((question, id) => (
            <div className="questionDiv" key={id}>
              <h1>{question.question}</h1>
              <div>
                {dataAnswers
                  .filter((a) => {
                    return a.question_id === question.id;
                  })
                  .map((answer, i) => {
                    return <p key={i}>{answer.answer}</p>;
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
