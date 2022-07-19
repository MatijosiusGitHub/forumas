import "./user.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import CommentIcon from "@mui/icons-material/Comment";

function User({ user, questions, getAllQuestions }) {
  const navigate = useNavigate();

  // delete question
  const deleteQuestion = (questionID) => {
    fetch(`/deleteQuestion/${questionID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(getAllQuestions());
  };

  return (
    <motion.div
      className="mainDivProfile"
      initial={{ width: 0 }}
      animate={{ width: "70%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <div className="mainProfileDiv">
        {/* cover */}
        <div className="coverPic">
          <img
            className="coverPicPic"
            src={user.cover_picture}
            alt="cover picture"
          />
        </div>
        {/* profile pic */}
        <div className="profilePicDiv">
          <img
            className="profilePicPic"
            src={user.picture}
            alt="profile picture"
          />
        </div>
        {/* name */}
        <h1>
          {user.name} {user.surname}
        </h1>
        <div className="profileRecentPosts">
          <h2>Recently asked questions</h2>
          {questions
            .filter((question) => question.user_id === user.id)
            .map((question, i) => (
              <div key={i}>
                <p>
                  {question.question}{" "}
                  <span
                    style={{
                      fontSize: 7,
                    }}
                  >
                    {question.edited === true ? "edited" : null}
                  </span>
                  <Link to={`/questions/${question.id}`}>
                    <span
                      style={{
                        fontSize: 8,
                        color: "rgb(62, 216, 255)",
                      }}
                    >
                      {" "}
                      see <CommentIcon fontSize="" />
                    </span>{" "}
                  </Link>
                  <button
                    className="profileDeleteQuestion"
                    onClick={() => deleteQuestion(question.id)}
                  >
                    delete
                  </button>
                </p>
              </div>
            ))}
          {/* <button onClick={deleteQuestion}>delete</button> */}
        </div>
      </div>
    </motion.div>
  );
}

export default User;
