import React from "react";
import { Tabs, Tab, TabList, TabPanel, Container } from "@cloudoperators/juno-ui-components";
import useResetCommitment from "../../hooks/useResetCommitment";

const AvailabilityZoneNav = (props) => {
  const azIndex = props.az.findIndex((az) => az[0] === props.currentAZ);
  const { resetCommitment } = useResetCommitment();

  return (
    <Container px={false} className="pt-0 py-6 sticky top-[2rem] bg-juno-grey-light-1 z-[100]">
      <Tabs selectedIndex={azIndex} onSelect={() => {}}>
        <TabList>
          {props.az.map(
            (az) =>
              az[0] !== "unknown" &&
              az[0] !== "any" && (
                <Tab
                  key={az}
                  onClick={() => {
                    resetCommitment(az);
                  }}
                >
                  {az[0]}
                </Tab>
              )
          )}
        </TabList>
        {props.az.map(
          (az) =>
            az[0] !== "unknown" &&
            az[0] !== "any" && <TabPanel key={az[0]}></TabPanel>
        )}
      </Tabs>
    </Container>
  );
};

export default AvailabilityZoneNav;
