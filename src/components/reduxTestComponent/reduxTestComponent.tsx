import React from 'react'
import { connect } from 'react-redux'
import './reduxTestComponent.scss'
import { add, red } from '../../store/actions/reduxTestComponent'


interface Props {
    counter: number,
    increaseCounter: Function,
    reduceCounter: Function
}

const ReduxTestComponent: React.FC<Props> = (props) => {
    return (
        <div className='test'>
            <div>Counter: {props.counter}</div>
            <button onClick={() => props.increaseCounter()}>+</button>
            <button onClick={() => props.reduceCounter()}>-</button>
        </div>
    )
}

function mapStateToProps(state: any) {
    return {
        counter: state.ReduxTestComponent.counter
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        increaseCounter: () => dispatch(add()),
        reduceCounter: () => dispatch(red())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTestComponent)