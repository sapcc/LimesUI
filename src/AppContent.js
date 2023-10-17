import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Container } from "juno-ui-components"
import { fetchProjectData } from "./lib/apiClient"

// This is your starting point of tour application
const AppContent = (props) => {

  const projectDataRequest = useQuery({ queryKey: ['projectData'], queryFn: fetchProjectData });

  return (
    <Container>
      <pre>{JSON.stringify(projectDataRequest, null, 2)}</pre>
    </Container>
  )
}

export default AppContent
