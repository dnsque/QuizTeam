import React, { createContext, useContext, useState } from 'react'

export const stateContext = createContext();

const getFreshContext = () => {
    return {
        participantId: 0,
        timeTaken: 0,
        selectedOptions:[]
    }
}
export default function useStateContext() {
    const {context, setContext} = useContext(stateContext)
    return {context,
        setContext: (obj) => setContext((prevContext) => ({ ...prevContext, ...obj }))

        };
}

export function ContextProvider({children}) {
    const [context, setContext] = useState(getFreshContext())

  return (
    <stateContext.Provider value={{ context, setContext }}>
        {children}
    </stateContext.Provider>
  )
}
