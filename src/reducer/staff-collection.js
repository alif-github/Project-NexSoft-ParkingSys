let initialUserState = {
    staff: {}
}

//manipulate the state
const staffColReducer = (state = initialUserState , action) => {
    switch (action.type) {
        case 'ADD_DATASTAFF':
            return ({
                ...initialUserState,
                staff: action.payload.user
            })
        default:
            return state;
    }
} 

export default staffColReducer;