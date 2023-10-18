import React from "react"
import { useQuery } from "@tanstack/react-query"
import { Container } from "juno-ui-components"
import { fetchProjectData } from "./lib/apiClient"
import Areas from "./Areas"
import useLimesStore from "./store"

// This is your starting point of tour application
const AppContent = (props) => {
  const projectData = useQuery({ queryKey: ['projectData'], queryFn: fetchProjectData })
  const formatData = useLimesStore((state) => state.restructureReport)

  return (
    <Container>
      {
        projectData?.data &&
        console.log(formatData(projectData))
      }
    </Container>
  )
}

export default AppContent
