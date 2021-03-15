let initialMemberState = {
    member: {}
}

//manipulate the state
const memberColReducer = (state = initialMemberState , action) => {
    switch (action.type) {
        case 'ADD_DATAMEMBER':
            return ({
                ...initialMemberState,
                member: action.payload.member
            })
        default:
            return state;
    }
} 

export default memberColReducer;