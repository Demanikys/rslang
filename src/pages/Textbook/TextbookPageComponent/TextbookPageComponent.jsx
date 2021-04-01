import React, { useEffect, useState } from 'react'
// import { Route } from 'react-router'
import './TextbookPageComponent.scss'
import TextbookWordComponent from '../TextbookWordComponent'

const TextbookPageComponent = (props) => {
    const dataProps = props
    const [wordsData, setWordData] = useState()

    useEffect(() => {
        try {
            fetch(`https://newrslangapi.herokuapp.com/words/?group=${dataProps.groupNumber}&page=${dataProps.pageNumber}`)
                .then(response => response.json())
                .then(response => setWordData(response))
        } catch (e) {
            console.log(e)
        }
    }, [dataProps.pageNumber])

    return (
        wordsData
            ? (<div className='textbook_page_component'>
                {
                    wordsData.map((item, index) => {
                        return (
                            <TextbookWordComponent word={item} key={index} />
                        )
                    })
                }
            </div>)
            : ('...загрузка...')
    )

}

export default TextbookPageComponent