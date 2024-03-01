import React from "react";
import { Tabs, Tab, TabList, TabPanel, Container } from "juno-ui-components";
import useResetCommitment from "../../hooks/useResetCommitment";

const AvailabilityZoneNav = (props) => {
  const azIndex = props.az.findIndex((az) => az[0] === props.currentAZ);
  const { resetCommitment } = useResetCommitment();
  const { resetCommitmentTransfer } = useResetCommitment();

  return (
    <Container px={false} className="py-6 sticky top-0 bg-juno-grey-light-1 z-[100]">
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
                    resetCommitmentTransfer();
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
