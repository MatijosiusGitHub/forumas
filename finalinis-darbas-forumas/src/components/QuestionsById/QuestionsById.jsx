import "./questionsOnid.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const QuestionByID = ({
  dataUsers,
  dataAnswers,
  user,
  loggedIn,
  getAllAnswers,
}) => {
  const { id } = useParams();
  const [data, setData] = useState([]); // question by id data

  // get question data
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

  // edit questions
  const [change, setChange] = useState("");
  const editAnswerID = (e, editAnswer1) => {
    e.preventDefault();
    fetch(`/question/answer/${editAnswer1}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        answer: change,
      }),
    })
      .then(() => getAllAnswers())
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
                <div>
                  {/*  username for answer  */}
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
                  {answer.answer} {/*  delete button  */}
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
                  </span>{" "}
                  {/*  edit button */}
                  <span>
                    {user.id === answer.user_id ? (
                      <button
                        onClick={() =>
                          editAnswerID(
                            user.id === answer.user_id ? answer.id : null
                          )
                        }
                      >
                        ✍🏼
                      </button>
                    ) : null}
                  </span>
                </div>
                {user.id === answer.user_id ? (
                  <div>
                    {/*  edit form  */}
                    <form onSubmit={(e) => editAnswerID(e, answer.id)}>
                      <textarea
                        className="textarea"
                        name="editAnswer"
                        cols="75"
                        rows="4"
                        required
                        value={change}
                        onChange={(e) => setChange(e.target.value)}
                      >
                        {user.id === answer.user_id ? answer.answer : null}
                      </textarea>
                      <button type="submit">OK</button>
                    </form>
                  </div>
                ) : null}
              </div>
            );
          })}
      </div>
      {loggedIn ? (
        <div>
          {/*  answer form  */}
          <form onSubmit={(e) => answerQuestion(e)}>
            <textarea
              name="answerToComment"
              cols="75"
              rows="10"
              required
            ></textarea>
            <button type="submit">Answer</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};
export default QuestionByID;
