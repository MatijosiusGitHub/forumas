import "./addQuestion.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AddQuestion = ({ user, getAllQuestions }) => {
  const navigate = useNavigate();
  const askQuestion = async (e) => {
    e.preventDefault();
    await fetch("/ask", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      body: JSON.stringify({
        question: e.target.question.value,
        user_id: user.id,
        time_created: new Date().toLocaleDateString("LT"),
      }),
    })
      .then(() => navigate("/", { replace: true }))
      .then(getAllQuestions())
      .catch((err) => console.log(err));
  };
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "70%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
      className="mainFormDiv"
    >
      <form className="askQuestionForm" onSubmit={askQuestion}>
        <h1>Ask question</h1>
        <p>Try to ask right way to understand your question</p>
        <input
          type="text"
          name="question"
          placeholder="Why sky is blue?"
          required
        />{" "}
        <br />
        <button type="submit">Ask</button>
      </form>
    </motion.div>
  );
};
export default AddQuestion;
