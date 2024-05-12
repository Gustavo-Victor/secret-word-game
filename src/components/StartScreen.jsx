/* eslint-disable react/prop-types */
import styles from "./StartScreen.module.css";


const StartScreen = ({ startGame }) => {
    return (
        <div className={styles.start}>
            <h1>Secret Word</h1>
            <p>Click on the button below to start the game!</p>

            <button onClick={startGame}>Start</button>
        </div>
    )
}

export default StartScreen; 
