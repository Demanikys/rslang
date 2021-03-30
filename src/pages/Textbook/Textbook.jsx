import React, { useState } from 'react'
import './Textbook.scss'
import { Link, Switch, Route, BrowserRouter } from 'react-router-dom'
import TextbookPageComponent from './TextbookPageComponent'

const Textbook = () => {
    const pagesArray = [1, 2, 3, 4, 5, 6]
    const [pageNumber] = useState(0)

    return (
        <div className='textbook'>
            <BrowserRouter>
                <ul className='textbook_nav'>
                    <li><Link to='/textbook/1'>Group 1</Link></li>
                    <li><Link to='/textbook/2'>Group 2</Link></li>
                    <li><Link to='/textbook/3'>Group 3</Link></li>
                    <li><Link to='/textbook/4'>Group 4</Link></li>
                    <li><Link to='/textbook/5'>Group 5</Link></li>
                    <li><Link to='/textbook/6'>Group 6</Link></li>
                </ul>
                <div className='textbook_content'>
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