import React, { useEffect } from "react"
import useLimesStore from "./lib/store/store"
import Overview from "./Overview"
import { useQuery } from "@tanstack/react-query"
import { Container } from "juno-ui-components"
import { fetchProjectData } from "./lib/apiClient"
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom"
import data from "./lib/limes_data_newApi.json"
import EditModal from "./project/EditPanel"

// This is your starting point of tour application
const AppContent = (props) => {
  //const projectData = useQuery({ queryKey: ['projectData'], queryFn: fetchProjectData })
  const projectData = { data: data }
  const formatData = useLimesStore((state) => state.restructureReport)
  const formattedData = formatData(projectData)

  return (
    <Container>
      {
        projectData?.data && (
          console.log(formatData(projectData)) ||
          <HashRouter>
            <Routes>
              <Route path="/" element={<Overview {...formattedData} canEdit={props.canEdit} />}> </Route>
              <Route path="/:currentArea/*" element={<Overview {...formattedData} canEdit={props.canEdit} />}> </Route>
              {props.canEdit && (
                <Route path="/:currentArea/edit/:categoryName/:resourceName" element={
                  <>
                    <Overview {...formattedData} canEdit={props.canEdit} />
                    <EditModal {...formattedData} />
                  </>
                } />
              )}
            </Routes>
          </HashRouter>)
      }
    </Container>
  )
}

export default AppContent
