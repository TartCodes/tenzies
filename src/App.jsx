import { useState } from "react";
import Die from "./Components/Die";

const App = () => {
  //function to create an array of 10 nums
  const allNewDice = () => {
    const dieArr = [];
    for (let i = 0; i < 10; i++) {
      dieArr.push(Math.ceil(Math.random() * 6));
    }
    return dieArr;
  };

  //setting set then create the random num elements
  const [dice, setDice] = useState(allNewDice());
  const diceElements = dice.map((die) => <Die value={die} />);
  //rerenders allNewDice to act as a roll function
  const rollDice = () => {
    setDice(allNewDice());
  };

  return (
    <main>
      <div className="die--grid">{diceElements}</div>
      <button onClick={rollDice}>Roll</button>
    </main>
  );
};

export default App;
