import { useState, useEffect } from "react";
import JSConfetti from 'js-confetti';
import * as module from "../localStorageModule";
import Die from "./Die";

export default function App() {
    let [dice, setDice] = useState(() => produceNum());
    let [gameComplete, setGameComplete] = useState(() => false);
    let [diceRollCount, setDiceCount] = useState(() => 0);
    let [lowestDiceRoll, setLDR] = useState(() => 0)

    useEffect(() => {
        checkGameCompletion()   

        // create new localStorage
        if (!localStorage.countsNumber) {
            module.addNewlocalStorage()
        }

    }, [dice])
    
    function setLowestDiceRoll() {
        let rollDiceCount = localStorage.getItem("countsNumber");
        let lowestDiceCount = !rollDiceCount.length ? 0 : Math.min(...JSON.parse(rollDiceCount));

        setLDR(() => lowestDiceCount);
    }

    function confetti() {
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({
            emojis: ['🦄', '🌸', '🌈', '✨'],
            emojiSize: 50,
            confettiNumber: 80,
         })
    }

    function produceNum() {
        let array = [];
        for (let i = 0; i < 10; i++) {
            array.push({
                        id: i,
                        value: randomNumber(),
                        isHeld: false,
                    });
        }

        return array
    }
    
    function randomNumber() {
        let diceEndValue = 6
        return Math.ceil(Math.random() * diceEndValue)
    }

    function checkGameCompletion() {
        let firstDice = dice[0].value;

        let gameCompletion = dice.every(die => (die.value === firstDice) && die.isHeld);

        if (gameCompletion) {
            setGameComplete(prevValue => !prevValue);
            confetti();
            module.addItem(diceRollCount);
            setLowestDiceRoll();
        }
    }

    // event handler
    function selectDice(currentId) {
        if (!gameComplete) {
            setDice(prevDice => {
                return prevDice.map(die => {
                    if (die.id === currentId) {
                        return {...die, 
                            isHeld: !die.isHeld
                            }
                    } else {
                        return die
                    }
                })
            })
        }
    }

    // rollDice and play again
    function rollDice() {
        setDiceCount(prevCount => prevCount + 1);

        if (!gameComplete) {
            setDice(prevDice => {
                return prevDice.map(die => {
                     if (die.isHeld) {
                         return die
                     } else {
                         return {...die, value: randomNumber()}
                     }
                })
             })
        } else {
            setDice(() => produceNum());
            setGameComplete(prevValue => !prevValue);
            setDiceCount(() => 0);
        }
    }

    // render dice
    let diceElement = dice.map((die, index) => {
        return (<Die 
                    key={ index }
                    id={ index } 
                    value={ die.value } 
                    selectDice={ (e) => selectDice(index) } 
                    isHeld= { die.isHeld }
                />)
    })

    return (
        <div className="container">
            <header className="text">
                <div className="count-container">
                    <h1 className="roll-count">Roll count: <span className="dice--count">{diceRollCount}</span></h1>
                    <h1 className="lowest-dice-roll">Lowest dice roll: <span className="lowest-count">{ lowestDiceRoll }</span></h1>
                </div>
               
                <h1 className="text--title">Tenzies</h1>
                <p className="text--description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </header>

            <main className="dice-btn">
                <div className="dice">
                    { diceElement }
                </div>

                <button className="roll-dice" onClick={ rollDice }>{ !gameComplete ? "Roll" : "Play Again" }</button>
            </main>
        </div>
    )
}