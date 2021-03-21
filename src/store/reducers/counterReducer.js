import { ADD, RED } from "../actions/actionTypes"

const initialState = {
    counter: 0
}

export default function counterReducer(state = initialState, action) {
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