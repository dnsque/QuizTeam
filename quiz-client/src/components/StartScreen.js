function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Sveiki atvykę!</h2>
      <h3>Dabar mes užduosim Jūms {numQuestions} klausimų.</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Pradėti
      </button>
    </div>
  );
}

export default StartScreen;
