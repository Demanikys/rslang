import { ADD, RED } from "../actions/actionTypes"
import { State } from '../../types'

const initialState = {
    counter: 0
}

interface Action {
    type: string
    payload?: any
}

export default function counterReducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case ADD:
            return {
                counter: state.counter + 1
            }
        case RED:
            return {
                counter: state.counter - 1
            }
        default:
            return state
    }

}