import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "../Context/AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

    const { currentUser } = useContext(AuthContext);

    const initialState = {
        chatID: "null",
        user: {}
    };

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "changeUser":
                return {
                    user: action.payload,
                    chatID: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, initialState);

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
}