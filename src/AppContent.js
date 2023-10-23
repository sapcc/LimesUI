import React, { useEffect } from "react"
import useLimesStore from "./lib/store/store"
import Overview from "./Overview"
import { useQuery } from "@tanstack/react-query"
import { Container } from "juno-ui-components"
import { fetchProjectData } from "./lib/apiClient"
import { HashRouter, Routes, Route } from "react-router-dom"
import EditModal from "./EditModal"

// This is your starting point of tour application
const AppContent = (props) => {
  const projectData = useQuery({ queryKey: ['projectData'], queryFn: fetchProjectData })
  const formatData = useLimesStore((state) => state.restructureReport)

  return (
    <Container>
      {
        projectData?.data && (
          console.log(formatData(projectData)) ||
          <HashRouter>
            <Routes>
              <Route exact path="/" element={<Overview {...formatData(projectData)} canEdit={props.canEdit} />}> </Route>
              <Route path="/:currentArea" element={<Overview {...formatData(projectData)} canEdit={props.canEdit} />}> </Route>
            </Routes>
          </HashRouter>)
      }
    </Container>
  )
}

export default AppContent
