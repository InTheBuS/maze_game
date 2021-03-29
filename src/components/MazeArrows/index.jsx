import React from "react"
import styles from "./index.css"

const MazeArrows = (props) => {

    const arrows = props.arrayOfArrows.map((arrow, index) => {

        let keydownColor = arrow.isRight === undefined
            ? ''
            : arrow.isRight
                ? styles.MazeArrows__Arrow__Right
                : styles.MazeArrows__Arrow__Wrong

        let arrowStyles =
            `${props.index >= index ? styles.MazeArrows_Arrow__Show : ''} 
            ${styles.MazeArrows__Arrow} 
            ${keydownColor}`

        return (
            <div className={arrowStyles} key={index}>
                {arrow.currentDirection}
            </div>
        )
    })

    return (
        <div className={styles.MazeArrows}>
            {arrows}
        </div>
    )
}
export default MazeArrows