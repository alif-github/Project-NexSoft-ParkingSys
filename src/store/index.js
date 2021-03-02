import staffColReducer from '../reducer/staff-collection'
import { combineReducers , createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['staffColReducer'],
    blacklist: []
}

let reducer = combineReducers({
    staffColReducer
})

const persistRdc = persistReducer(persistConfig, reducer)
let store = createStore(persistRdc)

export default store;