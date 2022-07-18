import "./Home.css";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const HomePage = ({
  loggedIn,
  dataQuestion,
  dataAnswers,
  user,
  dataUsers,
  getAllQuestions,
}) => {
  // delete question
  const deleteQuestion = (questionID) => {
    fetch(`/deleteQuestion/${questionID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(getAllQuestions());
  };
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
              <Link to={`/questions/${question.id}`}>
                <h1>{question.question}</h1>
              </Link>
              {question.user_id === user.id ? (
                <button
                  onClick={() =>
                    deleteQuestion(
                      user.id === question.user_id ? question.id : null
                    )
                  }
                >
                  delete
                </button>
              ) : null}
              <div>
                {dataAnswers
                  .filter((answer) => {
                    return answer.question_id === question.id;
                  })
                  .map((answer, i) => {
                    return (
                      <div key={i}>
                        <p>
                          <span style={{ fontWeight: "bold" }}>
                            {typeof dataUsers !== "undefined" ? (
                              dataUsers
                                .filter((username) => {
                                  return username.id === answer.user_id;
                                })
                                .map((username) => username.username)
                            ) : (
                              <span>Loading</span>
                            )}
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
        <div className="mainHomeDiv">
          <div className="welcomeDiv">
            <h1>Wello, stranger</h1>
          </div>
          {dataQuestion.map((question, id) => (
            <div className="questionDiv" key={id}>
              <Link to={`/questions/${question.id}`}>
                <h1>{question.question}</h1>
              </Link>
              <div>
                {dataAnswers
                  .filter((answer) => {
                    return answer.question_id === question.id;
                  })
                  .map((answer, i) => {
                    return (
                      <div key={i}>
                        <p>
                          <span style={{ fontWeight: "bold" }}>
                            {typeof dataUsers !== "undefined" ? (
                              dataUsers
                                .filter((username) => {
                                  return username.id === answer.user_id;
                                })
                                .map((username) => username.username)
                            ) : (
                              <span>Loading</span>
                            )}
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
      )}
    </>
  );
};
export default HomePage;
