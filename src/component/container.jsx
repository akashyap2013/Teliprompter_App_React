import { useRef, useContext } from "react"
import { ValueContext } from "./api"
import { Link } from "react-router-dom"

const Container = () => {
    const { value, setValue } = useContext(ValueContext)
    
    return (
        <div className="flex flex-col item-center max-w-screen-lg m-auto h-screen">
            <h1 className="text-3xl py-10">Teliprompter</h1>
            <p className="m-auto max-w-screen-sm text-center">
            A teleprompter, also known as an autocue, is a device used in television,
            film production, and public speaking to display a scrolling script or speech for presenters to read from while appearing to maintain eye contact with the audience or camera. 
            </p>

            {/* textarea textbox */}
            <textarea
                className="w-full h-screen p-4 my-4 border border-gray-300 rounded-md shadow-md"
                placeholder="Enter your text here"
                onChange={(e) => setValue(e.target.value)}
            ></textarea>

            <Link className="px-4 py-2 text-white bg-blue-500 rounded-md" to="/teliprompt">Generate</Link>
        </div>
    )
}


export default Container


