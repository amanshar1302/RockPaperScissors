import { useState } from "react";

const choices = ["rock", "paper", "scissors"];

function RockPaperScissors() {
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [rounds, setRounds] = useState(0);

  const [score, setScore] = useState({
    user: 0,
    computer: 0,
  });

  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);

  function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  function handleClick(choice) {
    const compChoice = getComputerChoice();

    setUserChoice(choice);
    setComputerChoice(compChoice);

    const outcome = determineWinner(choice, compChoice);

    setHistory((prev) => [
      ...prev,
      `You: ${choice} | Computer: ${compChoice} → ${outcome}`,
    ]);

    setRounds((prev) => prev + 1);
  }

  function determineWinner(user, comp) {
    let outcome = "";

    if (user === comp) {
      outcome = "Draw";
      setResult("It's a Draw!");
      setStreak(0);
    } else if (
      (user === "rock" && comp === "scissors") ||
      (user === "paper" && comp === "rock") ||
      (user === "scissors" && comp === "paper")
    ) {
      outcome = "You Win";
      setResult("You Win!");
      setScore((prev) => ({
        ...prev,
        user: prev.user + 1,
      }));
      setStreak((prev) => prev + 1);
    } else {
      outcome = "Computer Wins";
      setResult("Computer Wins!");
      setScore((prev) => ({
        ...prev,
        computer: prev.computer + 1,
      }));
      setStreak(0);
    }

    return outcome;
  }

  function resetGame() {
    setUserChoice("");
    setComputerChoice("");
    setResult("");
    setRounds(0);
    setScore({ user: 0, computer: 0 });
    setHistory([]);
    setStreak(0);
  }

  function getOverallWinner() {
    if (score.user > score.computer) return "You are leading!";
    if (score.computer > score.user) return "Computer is leading!";
    return "It's tied!";
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Rock Paper Scissors</h1>

      <button onClick={() => handleClick("rock")}>🪨 Rock</button>
      <button onClick={() => handleClick("paper")}>📄 Paper</button>
      <button onClick={() => handleClick("scissors")}>✂️ Scissors</button>

      <h2>Your Choice: {userChoice}</h2>
      <h2>Computer Choice: {computerChoice}</h2>

      <h2>{result}</h2>

      <h3>Score</h3>
      <p>
        You: {score.user} | Computer: {score.computer}
      </p>

      <h3>{getOverallWinner()}</h3>

      <h3>Rounds Played: {rounds}</h3>

      <h3>🔥 Win Streak: {streak}</h3>

      <button onClick={resetGame}>Reset Game</button>

      <h3>Move History</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {history.map((move, index) => (
          <li key={index}>{move}</li>
        ))}
      </ul>
    </div>
  );
}

export default RockPaperScissors;