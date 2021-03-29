import React, {useEffect} from "react"
import styles from "./index.css"

const MazeGame = (props) => {

    let startPosition = props.startPosition

    useEffect(() => {
        if (props.arrayOfFields[startPosition]) {
            props.useCallbackSetterValue('setArrayOfFields',
                [`${startPosition}.startPosition`, `${startPosition}.text`],
                [true, 'Start position'])
        }
    }, [props.arrayOfFields[startPosition]])

    const fields = props.arrayOfFields.map((field, index) => {

        let showRight = field.showRight ? styles.Field__ShowRight : ''

        let isRightClickColor = field.isRight === undefined
            ? ''
            : field.isRight === true
                ? styles.Field__Correct__Click
                : styles.Field__Wrong__Click

        let needToShake = field.shake ? styles.Field__Shake : ''

        let startPositionColor = field.startPosition ? styles.Field__BGColor : ''

        return (
            <div onClick={(event) => {
                     clickHandler(event, index)
                 }}
                 className={`${styles.Field} 
                 ${styles.centering} ${needToShake} 
                 ${isRightClickColor} ${showRight} 
                 ${startPositionColor}`}
                 key={index}>{field.text ? field.text : ''}</div>
        )
    })

    function clickHandler(event, index) {
        if (!props.readyToClick || !props.gameStarted) {
            return
        }

        let rightPosition = props.finalPosition

        if (rightPosition === index) {

            props.useCallbackSetterValue('setArrayOfFields',
                [`${rightPosition}.isRight`, `${rightPosition}.shake`],
                [true, true])

            props.gameOver()

            alert('Молодец, ты оказался прав!')

        } else {
            props.useCallbackSetterValue('setArrayOfFields',
                [`${index}.isRight`],
                [false])

            props.useCallbackSetterValue('setArrayOfFields',
                [`${rightPosition}.showRight`, `${rightPosition}.shake`, `${rightPosition}.text`],
                [true, true, 'This one'])

            props.gameOver()

            alert('Мимо, попробуй ещё раз!')
        }
    }

    return (
        <div className={styles.MazeGame}>
            {fields}
        </div>
    )
}
export default MazeGame