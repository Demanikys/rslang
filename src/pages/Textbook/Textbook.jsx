import React, { useState } from 'react'
import style from './Textbook.module.scss'
import { Link, Switch, Route, BrowserRouter } from 'react-router-dom'
import TextbookPageComponent from './TextbookPageComponent'

const Textbook = () => {
    const pagesArray = [1, 2, 3, 4, 5, 6]
    const [pageNumber, setPageNumber] = useState(0)

    return (
        <div className={style.textbook}>
            <BrowserRouter>
                <ul className={style.textbook_nav}>
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
                <div className={style.textbook_content}>
                    <div className={style.textbook_page_selectors}>
                        <button className={style.page_button} onClick={() => setPageNumber(pageNumber - 1)}>previous</button>
                        <div>{pageNumber + 1}</div>
                        <button className={style.page_button} onClick={() => setPageNumber(pageNumber + 1)}>next</button>
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