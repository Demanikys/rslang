import React, { useEffect, useState } from 'react'
import './GameSavanna.scss'
import words from './words.json'

words.sort(() => Math.random() - .5)

const GameSavanna = () => {

    const [wordCounter, setWordCounter] = useState(0)
    const [backgroundPosition, setBackgroundPosition] = useState(100)
    const [currentWord, setCurrentWord] = useState(words[wordCounter])
    const [currentWordAnswers, setCurrentWordAnswers] = useState()
    const [cls, setCls] = useState(['game_current_word'])
    const [health, setHealth] = useState([1, 2, 3, 4, 5])

    useEffect(() => {
        chooseWordsForAnswers(words)
        setTimeout(() => {
            setCls(['game_current_word', 'game_current_word_active'])
        }, 100)
    }, [currentWord])

    useEffect(() => {
        setCurrentWord(words[wordCounter])
    }, [wordCounter])

    const onKeyPressEventHandler = (event) => {
        console.log(currentWordAnswers)
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
    }

    document.onkeypress = onKeyPressEventHandler

    const onFullscreenBtnClick = (event) => {
        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            event.target.closest('.game').requestFullscreen().catch(e => console.log(e))
        }
    }

    const onUpBtnClick = () => {
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
        if (word.wordTranslate === currentWord.wordTranslate) {
            if (wordCounter < words.length - 1) {
                setCls(['game_current_word'])
                setWordCounter(wordCounter + 1)
                onUpBtnClick()
                const audio = new Audio
                audio.src = 'assets/sound/savanna_correct_answer.mp3'
                audio.play()
            } else {
                console.log('Win')
            }
        } else {
            console.log('1')
            setHealth(health.slice(0, -1))
            setCls(['game_current_word'])
            setWordCounter(wordCounter + 1)
            const audio = new Audio
            audio.src = 'assets/sound/savanna_wrong_answer.mp3'
            audio.play()
        }
    }

    return (
        <div className='game game_savanna' style={{ backgroundPositionY: `${backgroundPosition}%` }}>
            <div className='game_health_bar'>
                {
                    health.map(item => {
                        return (
                            <div key={item} className='game_health'><img src="assets/icons/pixel-heart.png" alt="heart" /></div>
                        )
                    })
                }
            </div>

            <button className='game_fullscreen_btn game_btn' onClick={(event) => onFullscreenBtnClick(event)}><img src='assets/icons/full-screen.png' alt='fullscreen_icon' /></button>
            {
                currentWord
                    ? (
                        <div className={cls.join(' ')}>{currentWord.word}</div>
                    )
                    : null
            }
            <div className='game_finish_line'></div>
            <div className='game_answers_block'>
                {currentWordAnswers
                    ? (currentWordAnswers.map((item, index) => {
                        return (
                            <button key={index} className='game_btn' onClick={() => onAnswerClickHandler(item)}>
                                {item.wordTranslate}
                            </button>
                        )
                    }))
                    : null}
            </div>
        </div>
    )
}

export default GameSavanna