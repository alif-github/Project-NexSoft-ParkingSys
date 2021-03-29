let defaultToogleState = {
    toggleUpdate: false
}

const tooglestatus = (state = defaultToogleState, action) => {
    switch (action.type) {
        case "TOOGLE_ON":
            return {
                toogleUpdate: true
            }
        case "TOOGLE_OFF":
            return {
                toogleUpdate: false
            }
        default:
            return state
    }
}

export default tooglestatus