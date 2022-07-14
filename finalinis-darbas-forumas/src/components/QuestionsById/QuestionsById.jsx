import "./questionsOnid.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const QuestionByID = ({
  dataUsers,
  dataAnswers,
  user,
  loggedIn,
  getAllAnswers,
  getAllQuestions,
}) => {
  const { id } = useParams();
  const [data, setData] = useState([]); // question by id data

  // get data
  useEffect(() => {
    fetch(`/questions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [id]);

  // delete answer
  const deleteAnswer = (answerID) => {
    fetch(`/deleteAnswer/${answerID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(getAllAnswers());
  };

  // post answer
  const answerQuestion = async (e) => {
    e.preventDefault();
    const answerData = {
      user_id: user.id,
      question_id: data.id,
      answer: e.target.answerToComment.value,
    };
    await fetch(`/question/answer`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      body: JSON.stringify(answerData),
    })
      .then(getAllAnswers())
      .then(() => e.target.reset())
      .catch((err) => console.log(err));
  };

  return (
    <div className="mainQuestionByIdDiv">
      <div className="mainQuestion">
        <h1>{data.question}</h1>
      </div>
      <div className="mainAnswers">
        {dataAnswers
          .filter((answer) => {
            return answer.question_id === data.id;
          })
          .map((answer, i) => {
            return (
              <div key={i}>
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
                <span>
                  {user.id === answer.user_id ? (
                    <button
                      onClick={() =>
                        deleteAnswer(
                          user.id === answer.user_id ? answer.id : null
                        )
                      }
                    >
                      🚮
                    </button>
                  ) : null}
                </span>
              </div>
            );
          })}
      </div>
      {loggedIn ? (
        <div>
          <form onSubmit={answerQuestion}>
            <textarea name="answerToComment" cols="75" rows="10"></textarea>
            <button type="submit">Answer</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};
export default QuestionByID;
