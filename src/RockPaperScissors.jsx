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

  function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  function handleClick(choice) {
    const compChoice = getComputerChoice();

    setUserChoice(choice);
    setComputerChoice(compChoice);

    determineWinner(choice, compChoice);
    setRounds((prev) => prev + 1);
  }

  function determineWinner(user, comp) {
    if (user === comp) {
      setResult("It's a Draw!");
    } else if (
      (user === "rock" && comp === "scissors") ||
      (user === "paper" && comp === "rock") ||
      (user === "scissors" && comp === "paper")
    ) {
      setResult("You Win!");
      setScore((prev) => ({
        ...prev,
        user: prev.user + 1,
      }));
    } else {
      setResult("Computer Wins!");
      setScore((prev) => ({
        ...prev,
        computer: prev.computer + 1,
      }));
    }
  }

  function resetGame() {
    setUserChoice("");
    setComputerChoice("");
    setResult("");
    setRounds(0);
    setScore({ user: 0, computer: 0 });
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

      <h3>Rounds Played: {rounds}</h3>

      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default RockPaperScissors;