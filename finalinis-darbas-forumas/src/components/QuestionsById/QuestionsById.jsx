import "./questionsOnid.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";

const QuestionByID = ({
  dataUsers,
  dataAnswers,
  user,
  loggedIn,
  getAllAnswers,
  getAllQuestions,
}) => {
  const navigate = useNavigate();
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
  const getQuestionData = () => {
    fetch(`/questions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };
  // edit question
  const [edit, setEdit] = useState("");
  const editQuestionID = (e, editQuestion1) => {
    e.preventDefault();
    fetch(`/editQuestion/${editQuestion1}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        question: edit,
      }),
    })
      .then(() => getQuestionData()) //// cia baigiau!
      .catch((err) => console.log(err));
  };
  // delete question
  const deleteQuestion = (questionID) => {
    fetch(`/deleteQuestion/${questionID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(navigate("/"));
  };

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

  // edit answer
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
        edited: true,
      }),
    })
      .then(() => getAllAnswers())
      .catch((err) => console.log(err));
  };

  // edit knopke question
  const showHideQuestionEdit = () => {
    document.querySelector(".textareaQuestion").classList.toggle("hidden");
  };
  // edit knopke answer
  const showHideAnswerEdit = (id) => {
    document.getElementById(`${id}`).classList.toggle("hidden");
  };
  return (
    <motion.div
      className="mainQuestionByIdDiv"
      initial={{ width: 0 }}
      animate={{ width: "70%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <div className="mainQuestion">
        <h1>
          {data.question}{" "}
          <span
            style={{
              fontSize: 7,
            }}
          >
            {data.edited === true ? "edited" : null}
          </span>
          {loggedIn ? (
            <>
              <button
                onClick={deleteQuestion}
                style={{
                  backgroundColor: "transparent",
                  color: "red",
                  border: "1px solid red",
                  borderRadius: "50px",
                  fontSize: 8,
                  float: "right",
                  cursor: "pointer",
                }}
              >
                {" "}
                delete
              </button>
              <button
                onClick={showHideQuestionEdit}
                style={{
                  fontSize: 10,
                  backgroundColor: "transparent",
                  border: "1px solid gray",
                  borderRadius: "50px",
                  color: "gray",
                  cursor: "pointer",
                  float: "right",
                }}
              >
                edit
              </button>
            </>
          ) : null}
        </h1>
        {/*  edit form  */}
        <form
          className="textareaQuestion hidden"
          onSubmit={(e) => editQuestionID(e, data.id)}
        >
          <textarea
            name="editQuestion"
            cols="126"
            rows="4"
            required
            value={edit}
            onChange={(e) => setEdit(e.target.value)}
          ></textarea>
          <button type="submit">OK</button>
        </form>
      </div>
      <div className="mainAnswers">
        {dataAnswers
          .filter((answer) => {
            return answer.question_id === data.id;
          })
          .map((answer, i) => {
            return (
              <div key={i}>
                <div className="answersByIdDiv">
                  {/*  username for answer  */}
                  <span>
                    <img
                      style={{
                        borderRadius: "50%",
                        height: 30,
                        width: 30,
                      }}
                      src={
                        typeof dataUsers !== "undefined"
                          ? dataUsers
                              .filter((username) => {
                                return username.id === answer.user_id;
                              })
                              .map((username) => username.picture)
                          : null
                      }
                      alt="picture"
                    />
                  </span>
                  <span
                    style={{ fontWeight: "bold", color: "rgb(179, 179, 179)" }}
                  >
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
                  <span className="answerById">{answer.answer} </span>
                  <span
                    style={{
                      fontSize: 7,
                    }}
                  >
                    {answer.edited === true ? "edited" : null}
                    {/*  delete button  */}
                    <span>
                      {user.id === answer.user_id ? (
                        <button
                          style={{
                            backgroundColor: "transparent",
                            color: "red",
                            border: "1px solid red",
                            borderRadius: "50px",
                            fontSize: 8,
                            float: "right",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            deleteAnswer(
                              user.id === answer.user_id ? answer.id : null
                            )
                          }
                        >
                          delete
                        </button>
                      ) : null}
                    </span>{" "}
                    {/*  edit button */}
                    <span>
                      {user.id === answer.user_id ? (
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: " 1px solid gray",
                            color: "gray",
                            fontSize: 8,
                            borderRadius: "50px",
                            float: "right",
                            cursor: "pointer",
                          }}
                          onClick={() => showHideAnswerEdit(answer.id)}
                        >
                          edit
                        </button>
                      ) : null}
                    </span>{" "}
                  </span>
                  <span className="timeCreatedAtDivByID">
                    {answer.time_created}
                  </span>
                </div>
                {user.id === answer.user_id ? (
                  <div>
                    {/*  edit form  */}
                    <form
                      id={answer.id}
                      className="textareaAnswer hidden"
                      onSubmit={(e) => editAnswerID(e, answer.id)}
                    >
                      <textarea
                        name="editAnswer"
                        cols="126"
                        rows="4"
                        required
                        value={change}
                        onChange={(e) => setChange(e.target.value)}
                      ></textarea>
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
          <form
            className="answerQuestionForm"
            onSubmit={(e) => answerQuestion(e)}
          >
            <textarea
              name="answerToComment"
              cols="125"
              rows="10"
              required
            ></textarea>
            <button type="submit">Answer</button>
          </form>
        </div>
      ) : null}
    </motion.div>
  );
};
export default QuestionByID;
