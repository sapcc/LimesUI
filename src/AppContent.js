import React from "react"
import { useQuery } from "@tanstack/react-query"
import { Container } from "juno-ui-components"
import { fetchProjectData } from "./lib/apiClient"
import Areas from "./Areas"

// This is your starting point of tour application
const AppContent = (props) => {
  const projectData = useQuery({ queryKey: ['projectData'], queryFn: fetchProjectData })

  return (
    <Container>
      {
        projectData?.data &&
        <Areas api={projectData} />
      }
    </Container>
  )
}

export default AppContent
