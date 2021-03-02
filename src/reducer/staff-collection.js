let initialUserState = {
    staff: [],
    index: -1
}

//manipulate the state
const staffColReducer = (state = initialUserState , action) => {
    switch (action.type) {
        case 'ADD_DATASTAFF':
            return ({
                ...initialUserState,
                staff: action.payload.user,
                index: action.payload.idx
            })
    
        default:
            return state;
    }
} 

export default staffColReducer;