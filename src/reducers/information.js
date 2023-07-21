var initialState = {
    studentInfo: {},
    companyInfo: {}
}

if (localStorage.getItem('state')) {
    const state = JSON.parse(localStorage.getItem('state'))
    initialState = state.information
} 

const infoReducer = (state=initialState, action) => {
    switch (action.type) {
        case "STUDENT_INFO":
            return {
                ...state,
                studentInfo: action.payload
            }
        default:
            return state
    }
}

export default infoReducer;