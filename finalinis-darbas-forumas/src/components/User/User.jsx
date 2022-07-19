import "./user.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import CommentIcon from "@mui/icons-material/Comment";
import BasicModal from "../ProfilePictureModal/ProfilePicModal";
import { useState } from "react";

function User({ user, questions, getAllQuestions }) {
  const [users, setUsers] = useState({}); // login ir register user, welcome user
  const data = user;
  // edit profile picture
  const [update, setUpdate] = useState("");
  const editProfilePic = (e, editProfPic) => {
    e.preventDefault();
    fetch(`/updateProfPic/${editProfPic}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        picture: update,
      }),
    })
      .then(
        fetch("/users")
          .then((res) => res.json())
          .then((users) => {
            setUsers(users);
          })
      )
      .catch((err) => console.log(err));
  };

  // delete question
  const deleteQuestion = (questionID) => {
    fetch(`/deleteQuestion/${questionID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(getAllQuestions());
  };
  // edit knopke question
  const showHideEditKnopke = () => {
    document.querySelector(".formToEditPic").classList.toggle("hidden");
  };

  return (
    <motion.div
      className="mainDivProfile"
      initial={{ width: 0 }}
      animate={{ width: "70%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <div className="mainProfileDiv">
        <button onClick={showHideEditKnopke}>update profile picture</button>
        <form
          className="formToEditPic hidden"
          onSubmit={(e) => editProfilePic(e, user.id)}
        >
          <input
            onChange={(e) => setUpdate(e.target.value)}
            type="url"
            placeholder="ww.somthng.co"
          />
          <button type="submit">ok</button>
        </form>
        {/* cover */}
        <div className="coverPic">
          <img
            className="coverPicPic"
            src={user.cover_picture}
            alt="cover picture"
          />
        </div>
        {/* profile pic */}
        <div className="bigPictureButton">
          <BasicModal user={data} />
        </div>
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
