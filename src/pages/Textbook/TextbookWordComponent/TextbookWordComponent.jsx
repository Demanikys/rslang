import React from 'react'
import './TextbookWordComponent.scss'

const TextbookWordComponent = (props) => {
    const dataProps = props
    const item = dataProps.word
    console.log(item)
    return (
        <div className='textbook_word'>
            {item.word}
            {item.transcription}
            {item.wordTranslate}
            <span>{item.textMeaning}</span>

            {item.textMeaningTranslate}
            {item.textExample}
            {item.textExampleTranslate}
        </div>
    )
}

export default TextbookWordComponent