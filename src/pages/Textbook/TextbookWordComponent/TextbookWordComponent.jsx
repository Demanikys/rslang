import React, { useEffect, useRef } from 'react'
import './TextbookWordComponent.scss'

const TextbookWordComponent = (props) => {
    const dataProps = props
    const item = dataProps.word
    const textEx = useRef();
    const textMeaning = useRef();
    console.log(item)

    const onPlayBtnClick = () => {
        let a = new Audio
        let b = new Audio
        let c = new Audio
        a.src = `https://newrslangapi.herokuapp.com/${item.audio}`
        b.src = `https://newrslangapi.herokuapp.com/${item.audioMeaning}`
        c.src = `https://newrslangapi.herokuapp.com/${item.audioExample}`
        a.play()
        a.addEventListener('ended', () => b.play())
        b.addEventListener('ended', () => c.play())
    }

    useEffect(() => {
        textEx.current.innerHTML = item.textExample
        textMeaning.current.innerHTML = item.textMeaning
    }, [])

    return (
        <div className='textbook_word'>
            <div className='picture'><img src={`https://newrslangapi.herokuapp.com/${item.image}`} alt="word_image" /></div>
            <div className='info'>
                <ul>
                    <li><span>{item.word}</span><span>{item.transcription}</span><span>{item.wordTranslate}</span></li>
                    <li ref={textMeaning} />
                    <li>{item.textMeaningTranslate}</li>
                    <li ref={textEx} />
                    <li>{item.textExampleTranslate}</li>
                    <li><button onClick={onPlayBtnClick}>Play</button><button>Delete</button><button>Add to hard</button></li>
                </ul>
            </div>
        </div>
    )
}

export default TextbookWordComponent