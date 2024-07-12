import { createContext, useState } from "react";


const ValueContext = createContext({ value : null, setValue : () => {}})


const ValueProvider = ({ children }) => {
    const [value, setValue] = useState(null)

    return (
        <ValueContext.Provider value={{ value, setValue}}>
            { children }
        </ValueContext.Provider>
    )    
}

export { ValueContext, ValueProvider }

