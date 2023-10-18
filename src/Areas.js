import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Overview from "./Overview"

const Areas = (props) => {
    const apiData = props.api.data

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Overview api={apiData}/>}> </Route>
                <Route exact path="/:currentArea" element={<Overview api={apiData}/>}> </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Areas
