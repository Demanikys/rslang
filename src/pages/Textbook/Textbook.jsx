import React, { useState } from 'react'
import './Textbook.scss'
import { Link, Switch, Route, BrowserRouter } from 'react-router-dom'
import TextbookPageComponent from './TextbookPageComponent'

const Textbook = () => {
    const pagesArray = [1, 2, 3, 4, 5, 6]
    const [pageNumber, setPageNumber] = useState(0)

    return (
        <div className='textbook'>
            <BrowserRouter>
                <ul className='textbook_nav'>
                    {
                        pagesArray.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={`/textbook/${item}`}>Group {item}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className='textbook_content'>
                    <div className='textbook_page_selectors'>
                        <div className='page_button' onClick={() => setPageNumber(pageNumber - 1)}>previous</div>
                        <div>{pageNumber + 1}</div>
                        <div className='page_button' onClick={() => setPageNumber(pageNumber + 1)}>next</div>
                    </div>
                    <Switch>
                        {
                            pagesArray.map((item, index) => {
                                return (
                                    <Route key={index} path={`/textbook/${item}`}>
                                        <TextbookPageComponent groupNumber={index} pageNumber={pageNumber} />
                                    </Route>
                                )
                            })
                        }
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default Textbook