import React, { useEffect, useState } from 'react';

export default function HomePage() {
    return (
        <main className="flex flex-col items-center text-center mt-20 space-y-8">
        <h2 className="text-4xl font-bold text-white">
          Išbandyk savo žinias – tapk Quizo čempionu!
        </h2>
        <div className="flex space-x-8">
          {/* Кнопка 1 */}
          <a href="/quiz-list" className="flex items-center px-6 py-4 bg-blue-100 rounded-full shadow-md space-x-4 hover:bg-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-6.084-3.495A1 1 0 007 8.523v6.954a1 1 0 001.668.848l6.084-3.495a1 1 0 000-1.705z" />
            </svg>
            <span className="font-medium text-lg">Pradėti quiza</span>
          </a>
          {/* Кнопка 2 */}
          <a href ='/make-quiz' className="flex items-center px-6 py-4 bg-blue-100 rounded-full shadow-md space-x-4 hover:bg-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span className="font-medium text-lg">Sukurti quiza</span>
          </a>
        </div>
      </main>
    );
}
