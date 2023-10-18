import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Overview from "./Overview"

const Areas = (props) => {
    const apiData = props.api.data.project

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Overview api={apiData}/>}> </Route>
                <Route path="/:currentArea" element= {<Overview api={apiData}/>}> </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Areas
