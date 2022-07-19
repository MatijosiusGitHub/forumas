import "./questionsOnid.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const QuestionByID = ({
  dataUsers,
  dataAnswers,
  user,
  loggedIn,
  getAllAnswers,
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
  //    likes
  const Like = (e, likeID, likes) => {
    e.preventDefault();
    fetch(`/likes/${likeID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        liked: likes + 1,
      }),
    })
      .then(() => getAllAnswers())
      .catch((err) => console.log(err));
  };
  // dislikes
  const disLike = (e, disLikeID, dislikes) => {
    e.preventDefault();
    fetch(`/dislike/${disLikeID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        dislike: dislikes + 1,
      }),
    })
      .then(() => getAllAnswers())
      .catch((err) => console.log(err));
  };

  return (
    <motion.div
      className="mainQuestionByIdDiv"
      initial={{ width: 0 }}
      animate={{ width: "70%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      {/* question section */}
      <div className="mainQuestion">
        {/* main question */}
        <h1>
          {data.question}{" "}
          <span
            style={{
              fontSize: 7,
            }}
          >
            {data.edited === true ? "edited" : null}
          </span>
          {/*  buttons to delete or edit question  */}
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
        {/*  edit question form  */}
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
      {/* answer section */}
      <div className="mainAnswers">
        {dataAnswers
          .filter((answer) => {
            return answer.question_id === data.id;
          })
          .map((answer, i) => {
            return (
              <div key={i + 1000}>
                <div className="answersByIdDiv">
                  {/*  username and image for answer  */}
                  {/* image */}
                  <span>
                    <img
                      style={{
                        borderRadius: "50%",
                        height: 30,
                        width: 30,
                      }}
                      src={
                        typeof dataUsers !== "undefined" &&
                        dataUsers.filter((username) => {
                          return username.id === answer.user_id;
                        })[0].picture
                      }
                      alt="picture"
                    />
                  </span>
                  {/* username */}
                  <span
                    style={{ fontWeight: "bold", color: "rgb(179, 179, 179)" }}
                  >
                    {typeof dataUsers !== "undefined" ? (
                      dataUsers
                        .filter((username) => {
                          return username.id === answer.user_id;
                        })
                        .map((username, i) => (
                          <span key={i + 1500}>{username.username}</span>
                        ))
                    ) : (
                      <span>Loading</span>
                    )}
                    :
                  </span>{" "}
                  <span className="answerById">{answer.answer} </span>
                  {/* edited answer */}
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
                  {/* time created */}
                  <span className="timeCreatedAtDivByID">
                    {answer.time_created}
                  </span>
                  <span></span>
                </div>
                {/*  edit form  */}
                {user.id === answer.user_id && (
                  <div>
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
                )}
                {/* like/dislike */}
                <div className="likeDislikeDiv">
                  <p>{answer.liked}</p>
                  <form onSubmit={(e) => Like(e, answer.id, answer.liked)}>
                    <button type="submit">
                      <ThumbUpAltIcon color="success" />
                    </button>
                  </form>
                  <p>{answer?.dislike}</p>
                  <form onSubmit={(e) => disLike(e, answer.id, answer.dislike)}>
                    <button type="submit">
                      <ThumbDownIcon color="error" />
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
      </div>
      {loggedIn && (
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
      )}
    </motion.div>
  );
};
export default QuestionByID;
