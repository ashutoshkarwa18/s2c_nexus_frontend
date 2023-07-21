const studentLogin = (data)=> {
    return {
        type: "STUDENT_LOG_IN",
        payload: data
    }
}

const studentLogout = ()=> {
    return {
        type: "STUDENT_LOG_OUT"
    }
}

export {
    studentLogin,
    studentLogout
}