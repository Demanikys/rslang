import React, { useState } from 'react'
import { GameSavanna } from './GameSavanna.jsx'
import './GameSavannaContainer.scss'

const GameSavannaContainer = () => {
    const [isGameStarted, setIsGameStarted] = useState(false)
    return (
        isGameStarted
            ? <GameSavanna />
            : (<div className={'game_savanna_container'}>
                <div className={'game_savanna_container_description'}>
                    <h2>Саванна</h2>
                    <p>Во время игры вы увидите текущее отгадываемое слово и несколько вариантов перевода для него.</p>
                    <p>Вам необходимо выбрать правильный вариант перевода до того как слово опустится в красную зону.</p>
                    <p>Для выбора варианта ответа можно использовать как мышь, так и цифровые клавиши от 1 до 4.</p>
                    <p>Удачи!</p>
                </div>
                <button className={'game_savanna_container_btn'} onClick={() => {
                    setIsGameStarted(true)
                    console.log(isGameStarted)
                }}>Start</button>
            </div>)

    )
}

export default GameSavannaContainer