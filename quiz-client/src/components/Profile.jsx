import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const { id } = useParams(); // ID from URL
  const [userData, setUserData] = useState({
    avatar: null, // This is the avatar URL fetched from user data
    quizzes: [],
    answeredQuizzes: []
  });
  const [avatar, setAvatar] = useState(null);

  // Default avatar image
  const defaultAvatar = "https://cdn-icons-png.freepik.com/512/6596/6596121.png"; // Replace with your actual default avatar URL

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-11/12 max-w-xl bg-white shadow-lg rounded-2xl p-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl text-primary font-semibold">Profilis</h2>
        </div>
        <div className="flex flex-col items-center mb-6">
          {/* Display user avatar or default avatar */}
          <img
            src={avatar || userData.avatar || defaultAvatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mb-4"
          />
          <input
            accept="image/*"
            id="upload-avatar"
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
          />
          <label htmlFor="upload-avatar">
            <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg transition">
              Keisti Avatarą
            </button>
          </label>
        </div>

        <div className="mt-2">
          <h3 className="text-xl  mb-2 font-semibold">Profilio Quiz’ai:</h3>
          {userData.quizzes?.length > 0 ? (
            <ul className="list-disc pl-6">
              {userData.quizzes.map((quiz) => (
                <li key={quiz.id} className="text-lg">{quiz.title}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Nėra Quiz’ų</p>
          )}
        </div>

        <div className="mt-2">
          <h3 className="text-xl mb-2 font-semibold">Atsakyti Quiz’ai:</h3>
          {userData.answeredQuizzes?.length > 0 ? (
            <ul className="list-disc pl-6">
              {userData.answeredQuizzes.map((quiz) => (
                <li key={quiz.id} className="text-lg">{quiz.title}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Nėra atsakytų Quiz’ų</p>
          )}
        </div>
      </div>
    </div>
  );
}
