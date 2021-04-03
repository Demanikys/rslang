import React, { useEffect, useRef, useState } from 'react'
import style from './GameSavanna.module.scss'
import words from './words.json'
import GameResultWindow from '../../components/GameResultWindow'

const GameSavanna = () => {

    const [wordCounter, setWordCounter] = useState(0)
    const [backgroundPosition, setBackgroundPosition] = useState(100)
    const [currentWord, setCurrentWord] = useState(words[wordCounter])
    const [currentWordAnswers, setCurrentWordAnswers] = useState()
    const [cls, setCls] = useState([style.game_current_word])
    const [health, setHealth] = useState([1, 2, 3, 4, 5])
    const [sound, setSound] = useState(true)
    const [answerBtnsState, setAnswerBtnsState] = useState(true)
    const [isGameFinished, setIsGameFinished] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [wrongAnswers, setWrongAnswers] = useState([])
    let failTimerRef = useRef()

    useEffect(() => {
        words.sort(() => Math.random() - .5)
        return () => {
            clearTimeout(failTimerRef.current)
            document.onkeypress = null
        }
    }, [])

    useEffect(() => {
        if (isGameFinished) {
            return
        }
        chooseWordsForAnswers(words)
        setTimeout(() => {
            setCls([style.game_current_word, style.game_current_word_active])
            setAnswerBtnsState(true)
        }, 150)
    }, [currentWord])

    useEffect(() => {
        isGameOver()
        if (isGameFinished) {
            return
        }
        setCurrentWord(words[wordCounter])

    }, [wordCounter, isGameFinished])

    useEffect(() => {
        if (isGameFinished) {
            return
        }
        failTimerRef.current = setTimeout(() => {
            setCls([style.game_current_word, style.game_current_word_fail])
            setHealth(health.slice(0, -1))
            soundEffectsOnAnswerClick(false)
            setAnswerBtnsState(false)
            setWrongAnswers([...wrongAnswers, currentWord])
            setTimeout(() => {
                setCls([style.game_current_word])
                setWordCounter(wordCounter + 1)
            }, 500)
        }, 4200)
        return () => clearTimeout(failTimerRef.current)
    }, [currentWord])

    const onKeyPressEventHandler = (event) => {
        switch (event.code) {
            case 'Digit1':
                onAnswerClickHandler(currentWordAnswers[0])
                break
            case 'Digit2':
                onAnswerClickHandler(currentWordAnswers[1])
                break
            case 'Digit3':
                onAnswerClickHandler(currentWordAnswers[2])
                break
            case 'Digit4':
                onAnswerClickHandler(currentWordAnswers[3])
                break
        }
        clearTimeout(failTimerRef.current)
    }

    document.onkeypress = onKeyPressEventHandler

    const onFullscreenBtnClick = (event) => {
        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            event.target.parentNode.parentNode.requestFullscreen().catch(e => console.log(e))
        }
    }

    const onCorrectAnswerClick = () => {
        setCorrectAnswers([...correctAnswers, currentWord])
        if (backgroundPosition !== 0) {
            if (backgroundPosition - 100 / words.length < 0) {
                setBackgroundPosition(0)
            } else {
                setBackgroundPosition(backgroundPosition - 100 / words.length)
            }
        }
    }

    const chooseWordsForAnswers = (words) => {
        const answers = [currentWord]
        for (let i = 0; i < 3;) {
            let word = words[Math.floor(Math.random() * words.length)]
            if (!answers.includes(word)) {
                answers.push(word)
                i++
            }
        }
        setCurrentWordAnswers(answers.sort(() => Math.random() - 0.5))
    }

    const onAnswerClickHandler = (word) => {
        if (!answerBtnsState) {
            return
        }

        if (word.wordTranslate === currentWord.wordTranslate) {
            if (wordCounter < words.length - 1) {
                setCls([style.game_current_word])
                setWordCounter(wordCounter + 1)
                onCorrectAnswerClick()
                soundEffectsOnAnswerClick(true)
            } else {
                setIsGameFinished(true)
                clearTimeout(failTimerRef.current)
            }
        } else {
            setHealth(health.slice(0, -1))
            setCls(style.game_current_word)
            setWordCounter(wordCounter + 1)
            soundEffectsOnAnswerClick(false)
            setWrongAnswers([...wrongAnswers, currentWord])
        }
        clearTimeout(failTimerRef.current)
    }

    const soundEffectsOnAnswerClick = (answer) => {
        if (!sound) {
            return
        }

        const audio = new Audio
        answer
            ? audio.src = 'assets/sound/savanna_correct_answer.mp3'
            : audio.src = 'assets/sound/savanna_wrong_answer.mp3'
        audio.play()
    }

    const isGameOver = () => {
        console.log(health.length)
        if (health.length === 0 || wordCounter >= words.length) {
            setIsGameFinished(true)
            clearTimeout(failTimerRef.current)
        }
    }

    return (
        <div className={[style.game, style.game_savanna].join(' ')} style={{ backgroundPositionY: `${backgroundPosition}%` }}>
            <div className={style.game_sound_switcher} onClick={() => setSound(!sound)}>
                {
                    sound
                        ? (<img src='assets/icons/sound_on_icon.png' alt='sound_on' />)
                        : (<img src='assets/icons/sound_off_icon.png' alt='sound_off' />)
                }
            </div>
            {
                isGameFinished
                    ? <GameResultWindow correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} />
                    : (<div className={style.game_health_bar}>
                        {
                            health.map(item => {
                                return (
                                    <div key={item} className={style.game_health}><img src="assets/icons/pixel-heart.png" alt="heart" /></div>
                                )
                            })
                        }
                    </div>
                    )
            }


            <button className={[style.game_fullscreen_btn, style.game_btn].join(' ')} onClick={(event) => onFullscreenBtnClick(event)}><img src='assets/icons/full-screen.png' alt='fullscreen_icon' /></button>

            {
                currentWord && !isGameFinished
                    ? (
                        <div className={[...cls].join(' ')}>{currentWord.word}</div>
                    )
                    : null
            }

            {
                isGameFinished
                    ? null
                    : (
                        <>
                            <div className={style.game_finish_line}></div>
                            <div className={style.game_answers_block}>
                                {currentWordAnswers
                                    ? (currentWordAnswers.map((item, index) => {
                                        return (
                                            <button key={index} className={style.game_btn} onClick={() => onAnswerClickHandler(item)}>
                                                {item.wordTranslate}
                                            </button>
                                        )
                                    }))
                                    : null}
                            </div>
                        </>
                    )
            }

        </div>
    )
}

export { GameSavanna }