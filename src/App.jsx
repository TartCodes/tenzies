import { useState, useEffect } from "react";
import Die from "./Components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const App = () => {
	//function to create new die
	const generateNewDie = () => {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid()
		};
	};

	//function to create an array of 10 nums
	const allNewDice = () => {
		const dieArr = [];
		for (let i = 0; i < 10; i++) {
			dieArr.push(generateNewDie());
		}
		return dieArr;
	};

	//setting set then create the random num elements
	const [dice, setDice] = useState(allNewDice());
	//set tenzies win condition
	const [tenzies, setTenzies] = useState(false);
	//useEffect to check winning condition
	useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld);
		const firstValue = dice[0].value; //lets us compare values
		const allSameValue = dice.every((die) => die.value === firstValue);
		if (allHeld && allSameValue) {
			setTenzies(true);
		}
	}, [dice]);

	//create the actual element
	const diceElements = dice.map((die) => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			holdDice={() => holdDice(die.id)}
		/>
	));
	//rerenders allNewDice on condition or starts new game
	const rollDice = () => {
		if (!tenzies) {
			setDice((oldDice) =>
				oldDice.map((die) => {
					return die.isHeld ? die : generateNewDie();
				})
			);
		} else {
			setTenzies(false);
			setDice(allNewDice());
		}
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
			{tenzies && <Confetti />}
			<h1 className="title">Tenzies</h1>
			<p className="instructions">
				Roll until all dice are the same. Click each die to freeze it at its
				current value between rolls.
			</p>
			<div className="die--grid">{diceElements}</div>
			<button onClick={rollDice}>{tenzies ? "Reset" : "Roll"}</button>
		</main>
	);
};

export default App;
