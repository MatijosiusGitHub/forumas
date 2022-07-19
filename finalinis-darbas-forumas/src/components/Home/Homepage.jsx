import "./Home.css";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Switch from "@mui/material/Switch";
import { useEffect } from "react";
import { useState } from "react";

const HomePage = ({
  loggedIn,
  dataQuestion,
  dataAnswers,
  user,
  dataUsers,
  getAllQuestions,
  setQuestions,
}) => {
  // delete question
  const deleteQuestion = (questionID) => {
    fetch(`/deleteQuestion/${questionID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(getAllQuestions());
  };
  // filter
  useEffect(() => {
    checked ? mostAnswers() : newest();
  }, [dataQuestion.length]);
  const [checked, setChecked] = useState(false);
  const newest = () => {
    setQuestions(
      [...dataQuestion].sort(
        (b, a) =>
          new Date(a.time_created).getTime() -
          new Date(b.time_created).getTime()
      )
    );
  };
  const mostAnswers = () => {
    setQuestions(
      [...dataQuestion].sort(
        (b, a) =>
          dataAnswers.filter((item) => item.question_id === a.id).length -
          dataAnswers.filter((item) => item.question_id === b.id).length
      )
    );
  };

  const changeFilter = (e) => {
    e.target.checked ? mostAnswers() : newest();
    e.target.checked ? setChecked(true) : setChecked(false);
  };
  return (
    <>
      {loggedIn ? (
        <motion.div
          className="mainHomeDiv"
          initial={{ width: 0 }}
          animate={{ width: "80%" }}
          exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        >
          <div className="welcomeDiv">
            <h1>Welcome back, {user.username}</h1>
            <Link to={"/ask"}>
              <button className="newDiscusionKnopke">NEW DISCUSSION</button>
            </Link>
          </div>
          Newest
          <Switch onChange={changeFilter} />
          Most answers
          {/* quoestion */}
          {dataQuestion.map((question, i) => (
            <div className="questionDiv" key={i + 2500}>
              <Link to={`/questions/${question.id}`}>
                <h1>
                  {question.question}
                  {/* delete button */}
                </h1>
              </Link>
              <span>
                {question.user_id === user.id ? (
                  <button
                    className="deleteKnopkeisMain"
                    onClick={() =>
                      deleteQuestion(
                        user.id === question.user_id ? question.id : null
                      )
                    }
                  >
                    delete
                  </button>
                ) : null}
              </span>
              {/* answers */}

              <div>
                {dataAnswers
                  .filter((answer) => {
                    return answer.question_id === question.id;
                  })
                  .map((answer, i, array) => {
                    return (
                      <div key={i + 100}>
                        <span className="asnwersLength">
                          {" "}
                          <Link to={`/questions/${question.id}`}>
                            <span>{array.length} answers</span>
                          </Link>
                        </span>
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            lineHeight: 0,
                            borderBottom: "2px solid gray",
                            marginTop: 30,
                            padding: 5,
                          }}
                        >
                          {/* username ir picture */}
                          <span
                            style={{
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
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
                            <span key={i}>
                              {typeof dataUsers !== "undefined" &&
                                dataUsers.filter((username) => {
                                  return username.id === answer.user_id;
                                })[0].username}
                            </span>
                            :{" "}
                          </span>{" "}
                          {/* main answer */}
                          <span
                            style={{
                              marginLeft: 20,
                            }}
                          >
                            {answer.answer}{" "}
                          </span>
                        </p>
                        <span
                          style={{
                            fontSize: 9,
                            float: "right",
                            marginTop: "-40px",
                          }}
                        >
                          {answer.time_created}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </motion.div>
      ) : (
        // not logged in
        <motion.div
          className="mainHomeDiv"
          initial={{ width: 0 }}
          animate={{ width: "80%" }}
          exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        >
          <div className="welcomeDiv">
            <h1>Wello, stranger</h1>
          </div>
          {dataQuestion.map((question, i) => (
            <div className="questionDiv" key={i + 2000}>
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
                      <div key={i + 500}>
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            lineHeight: 0,
                            borderBottom: "2px solid gray",
                            marginTop: 30,
                            padding: 5,
                          }}
                        >
                          <span
                            style={{
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <span>
                              <img
                                style={{
                                  borderRadius: "50%",
                                  height: 30,
                                  width: 30,
                                }}
                                src={
                                  typeof dataUsers !== "undefined"
                                    ? dataUsers.filter((username) => {
                                        return username.id === answer.user_id;
                                      })[0].picture
                                    : null
                                }
                                alt=""
                              />
                            </span>
                            <span>
                              {typeof dataUsers !== "undefined" ? (
                                dataUsers.filter((username) => {
                                  return username.id === answer.user_id;
                                })[0].username
                              ) : (
                                <span>Loading</span>
                              )}
                            </span>
                            :{" "}
                          </span>{" "}
                          <span
                            style={{
                              marginLeft: 20,
                            }}
                          >
                            {answer.answer}{" "}
                          </span>
                        </p>
                        <span
                          style={{
                            fontSize: 9,
                            float: "right",
                            marginTop: "-40px",
                          }}
                        >
                          {answer.time_created}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </>
  );
};
export default HomePage;
