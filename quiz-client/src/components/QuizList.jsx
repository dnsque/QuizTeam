import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Загрузка данных из файла quizzes.json в папке public
    fetch("quizzes.json")
      .then((res) => res.json())
      .then((data) => setQuizzes(data.quizzes)) // Используем data.quizzes, если это основной объект
      .catch((err) => console.error("Error fetching quizzes:", err));
  }, []);

  return (
    <div className="quizList p-6">
      <h1 className="text-6xl font-semibold mb-8 text-center">
        Atraskite geriausią jums skirtą viktoriną!
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        
        {quizzes.map((quiz) => (
            
          <div
            key={quiz.id}
            className="bg-white p-4 m-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-80"
          >            <Link
          to={`/quiz/${quiz.id}`}
          className="text-2xl font-semibold hover:text-blue-200"
        >
            
            {/* Display the quiz image */}
            <img
              src={quiz.image}
              alt={quiz.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            {/* Display the quiz title */}
              {quiz.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizList;
