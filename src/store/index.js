import auth from '../reducer/auth'
import staffColReducer from '../reducer/staff-collection'
import memberColReducer from '../reducer/member-collection'
import tooglestatus from '../reducer/toogle-update'
import { combineReducers , createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['staffColReducer','auth','memberColReducer','tooglestatus'],
    blacklist: []
}

let reducer = combineReducers({
    staffColReducer,
    auth,
    memberColReducer,
    tooglestatus
})

const persistRdc = persistReducer(persistConfig, reducer)
let store = createStore(persistRdc)

export default store;