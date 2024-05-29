import { createContext, useContext, useReducer } from "react";

const notificationReducer =  (state, action) => {
    switch (action.type) {
        case "VOTED":
            return `anecdote '${action.payload}' voted`
        case "CREATE":
            return `anecdote '${action.payload}' has been created`
        case "HIDE_NOTIFICATION": 
            return true
        case "ERROR":
            return `${action.payload.error}`
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, true)

    return (
        <NotificationContext.Provider value = {[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export const handleVoteEvent = (dispatch, content) => {
    dispatch({type: 'VOTED', payload: content})
    setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000); 
}

export const handleCreateEvent = (dispatch, content) => {
    dispatch({type: 'CREATE', payload: content})
    setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000); 
}

export const handleError = (dispatch, content) => {
    dispatch({type: 'ERROR', payload: content})
    setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' });
      }, 5000); 
}


export default NotificationContext