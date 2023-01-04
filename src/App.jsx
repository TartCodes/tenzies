import { useState } from "react";
import Die from "./Components/Die";
import { nanoid } from "nanoid";

const App = () => {
	//function to create an array of 10 nums
	const allNewDice = () => {
		const dieArr = [];
		for (let i = 0; i < 10; i++) {
			dieArr.push({
				value: Math.ceil(Math.random() * 6),
				isHeld: false,
				id: nanoid()
			});
		}
		return dieArr;
	};

	//setting set then create the random num elements
	const [dice, setDice] = useState(allNewDice());
	//create the actual element
	const diceElements = dice.map((die) => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			holdDice={() => holdDice(die.id)}
		/>
	));
	//rerenders allNewDice to act as a roll function
	const rollDice = () => {
		setDice(allNewDice());
	};

	//hold dice
	const holdDice = (id) => {
		setDice((oldDice) =>
			oldDice.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
			})
		);
	};

	return (
		<main>
			<h1 className="title">Tenzies</h1>
			<p className="instructions">
				Roll until all dice are the same. Click each die to freeze it at its
				current value between rolls.
			</p>
			<div className="die--grid">{diceElements}</div>
			<button onClick={rollDice}>Roll</button>
		</main>
	);
};

export default App;
