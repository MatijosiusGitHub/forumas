import "./questionsOnid.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const QuestionByID = ({ dataUsers, dataAnswers }) => {
  const [data, setData] = useState([]); // question by id data
  let { id } = useParams();
  useEffect(() => {
    fetch(`/questions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [id]);
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
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default QuestionByID;
