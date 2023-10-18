import React from "react"
import { HashRouter, Routes, Route } from "react-router-dom"
import Overview from "./Overview"

const Areas = (props) => {
    const apiData = props.api.data.project

    return (
        <HashRouter>
            <Routes>
                <Route exact path="/" element={<Overview api={apiData}/>}> </Route>
                <Route path="/:currentArea" element= {<Overview api={apiData}/>}> </Route>
            </Routes>
        </HashRouter>
    )
}

export default Areas
