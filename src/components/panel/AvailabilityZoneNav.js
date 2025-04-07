/**
 * Copyright 2024 SAP SE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import AddCommitments from "../shared/AddCommitments";
import ReceiveCommitment from "./ReceiveCommitment";
import { Stack, Tabs, Tab, TabList, TabPanel, Container } from "@cloudoperators/juno-ui-components";
import useResetCommitment from "../../hooks/useResetCommitment";
import MergeCommitment from "../shared/MergeCommitments";

const AvailabilityZoneNav = (props) => {
  const azIndex = props.az.findIndex((az) => az[0] === props.currentAZ);
  const { scope, setCurrentAZ } = props;
  const { resetCommitment } = useResetCommitment();

  return (
    <Container px={false} className="pt-0 py-6 sticky top-[2rem] bg-juno-grey-light-1 z-[100]">
      <Tabs selectedIndex={azIndex} onSelect={() => {}}>
        <TabList>
          {props.az.map((az) => {
            const azName = az[0];
            return (
              azName !== "unknown" &&
              azName !== "any" && (
                <Tab
                  data-testid={`tab/${azName}`}
                  key={azName}
                  onClick={() => {
                    setCurrentAZ(azName);
                    resetCommitment();
                  }}
                >
                  {az[0]}
                </Tab>
              )
            );
          })}
          {scope.isProject() && (
            <Stack className="h-8 my-auto ml-auto mr-2" gap="1">
              <ReceiveCommitment />
              <MergeCommitment />
              <AddCommitments label="Add" />
            </Stack>
          )}
        </TabList>
        {props.az.map((az) => az[0] !== "unknown" && az[0] !== "any" && <TabPanel key={az[0]}></TabPanel>)}
      </Tabs>
    </Container>
  );
};

export default AvailabilityZoneNav;
