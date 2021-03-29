import React, {useState, useEffect, useCallback} from "react"
import styles from "./index.css"
import MazeGame from "./../MazeGame/index.jsx";
import MazeArrows from "../MazeArrows/index.jsx";
import {getRandomIntInclusive} from "../../utils/getRndNumber";
import {setValueByPath} from "../../utils/setValueByPath";

const arrowDown = "↓" //+3
const arrowUp = "↑"   //-3
const arrowLeft = "←" //-1
const arrowRight = "→"//+1

const App = () => {

    function gameOver() {
        setGameStarted(false)
        setReadyToClick(false)
    }

    const mazePossibleMoves = [
        {position: 0, canMove: [1, 3], canMoveDirection: [arrowRight, arrowDown]},
        {position: 1, canMove: [0, 2, 4], canMoveDirection: [arrowLeft, arrowRight, arrowDown]},
        {position: 2, canMove: [1, 5], canMoveDirection: [arrowLeft, arrowDown]},
        {position: 3, canMove: [0, 4, 6], canMoveDirection: [arrowUp, arrowRight, arrowDown]},
        {position: 4, canMove: [1, 3, 5, 7], canMoveDirection: [arrowUp, arrowLeft, arrowRight, arrowDown]},
        {position: 5, canMove: [2, 4, 8], canMoveDirection: [arrowUp, arrowLeft, arrowDown]},
        {position: 6, canMove: [3, 7], canMoveDirection: [arrowUp, arrowRight]},
        {position: 7, canMove: [4, 6, 8], canMoveDirection: [arrowUp, arrowLeft, arrowRight]},
        {position: 8, canMove: [5, 7], canMoveDirection: [arrowUp, arrowLeft]},
    ]

    const [arrayOfArrows, setArrayOfArrows] = useState([])
    const [arrayOfFields, setArrayOfFields] = useState([])
    const [gameStarted, setGameStarted] = useState(false)
    const [readyToClick, setReadyToClick] = useState(false)
    const [finalPosition, setFinalPosition] = useState(0)
    const [startPosition, setStartPosition] = useState(0)
    const [index, setIndex] = useState(10)

    const useCallbackSetterValue = useCallback((setterName, path, value) => {
        setterValue(setterName, path, value)
    }, [arrayOfFields, arrayOfArrows])

    function setterValue(setterName, path, value) {
        const setterObj = {
            setArrayOfArrows,
            setArrayOfFields: {fields: arrayOfFields, setter: setArrayOfFields}
        }
        const fields = [...setterObj[setterName].fields]

        setValueByPath(fields, value, path)
        setterObj[setterName].setter(fields)
    }

    useEffect(() => {
        let fieldsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        setArrayOfFields([...fieldsArray])
    }, [])

    function startGame() {
        setArrayOfArrows([])
        setGameStarted(true)
        setReadyToClick(false)

        let currentPosition = getRandomIntInclusive(0, 8)

        setStartPosition(currentPosition)

        const fieldsArray = []

        for (let index = 0; index < 9; index++) {
            fieldsArray.push({position: index})
        }

        setArrayOfFields([...fieldsArray])

        const arrowsArray = []

        for (let i = 0; i < 10; i++) {

            let possibleMove = getRandomIntInclusive(0, mazePossibleMoves[currentPosition].canMove.length - 1)

            let newMove = mazePossibleMoves[currentPosition].canMove[possibleMove]
            let currentDirection = mazePossibleMoves[currentPosition].canMoveDirection[possibleMove]

            arrowsArray.push({currentPosition: currentPosition, nextMove: newMove, currentDirection: currentDirection})

            currentPosition = newMove

        }

        setArrayOfArrows([...arrowsArray])
        setFinalPosition(arrowsArray[arrowsArray.length - 1].nextMove)
        setIndex(0)
    }

    function rightKeydown() {
        isRightKey(true)
        return true
    }

    function wrongKeydown() {
        gameOver()
        isRightKey(false)
        alert("Не в ту сторону! Попробуй ещё раз!")
    }

    function isRightKey(isRight) {
        let newArr = [...arrayOfArrows]
        newArr[index].isRight = isRight
        setArrayOfArrows([
            ...newArr
        ])
    }

    function keyDownHandler(event) {
        if (!gameStarted) return
        let i = index
        if (i > 9) return
        let valid = false
        let current = arrayOfArrows[i].currentDirection

        if (event.key === "ArrowLeft" && current === arrowLeft) {
            valid = rightKeydown()
        } else if (event.key === "ArrowRight" && current === arrowRight) {
            valid = rightKeydown()
        } else if (event.key === "ArrowUp" && current === arrowUp) {
            valid = rightKeydown()
        } else if (event.key === "ArrowDown" && current === arrowDown) {
            valid = rightKeydown()
        } else if (event.key === "ArrowLeft"
            || event.key === "ArrowRight"
            || event.key === "ArrowUp"
            || event.key === "ArrowDown") {
            wrongKeydown()
        }

        if (valid) {
            setIndex(i + 1)
            if (i + 1 > 9) {
                setReadyToClick(true)
            }
        }
    }

    document.body.onkeydown = keyDownHandler

    return (
        <div className={styles.App}>
            <button className={styles.startButton} onClick={startGame}>Start game</button>

            <MazeGame arrayOfFields={arrayOfFields} gameOver={gameOver}
                      useCallbackSetterValue={useCallbackSetterValue}
                      finalPosition={finalPosition} startPosition={startPosition}
                      readyToClick={readyToClick} gameStarted={gameStarted}/>

            <MazeArrows arrayOfArrows={arrayOfArrows} index={index}/>
        </div>
    )
}
export default App