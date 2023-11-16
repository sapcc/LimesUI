import React from "react"
import { Tabs, Tab, TabList, TabPanel, Container } from "juno-ui-components"
import useStore from "../../lib/store/store"
import { initialCommitmentObject } from "../../lib/store/store"

const AvailabilityZoneNav = (props) => {
  const setIsCommitting = useStore((state) => state.setIsCommitting)
  const setCommitment = useStore((state) => state.setCommitment)
  return (
    <Container px={false} className="py-6">
      <Tabs>
        <TabList>
          {props.az.map((az) => (
            <Tab
              key={az}
              onClick={() => {
                props.setCurrentAZ(az[0])
                setIsCommitting(false)
                setCommitment(initialCommitmentObject)
              }}
            >
              {az[0]}
            </Tab>
          ))}
        </TabList>
        {Object.keys(props.az).map((az) => (
          <TabPanel key={az}></TabPanel>
        ))}
      </Tabs>
    </Container>
  )
}

export default AvailabilityZoneNav
