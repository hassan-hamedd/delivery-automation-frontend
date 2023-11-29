import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import RootReducer from './reducers/RootReducer'

const initialState = {}
const middlewares = [thunk]
let devtools = (x) => x

// if (
//     true
// ) {
//     devtools = window.__REDUX_DEVTOOLS_EXTENSION__()
// }

export const Store = createStore(
    RootReducer,
    initialState,
    compose(applyMiddleware(...middlewares), devtools)
)
