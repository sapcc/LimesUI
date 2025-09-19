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
import { Stack, Tabs, Tab, TabList, TabPanel, Container, Icon } from "@cloudoperators/juno-ui-components";
import useResetCommitment from "../../hooks/useResetCommitment";
import MergeCommitment from "../shared/MergeCommitments";
import ToolTipWrapper from "../shared/ToolTipWrapper";
import { CustomZones } from "../../lib/constants";
import { isAZUnaware } from "../../lib/utils";

const AvailabilityZoneNav = (props) => {
  const { scope, resource, currentTab, setCurrentTab, mergeOps, publicCommitmentQuery } = props;
  const { data } = publicCommitmentQuery;
  const publicCommitments = data?.commitments || [];
  const { setIsMerging, setCommitmentsToMerge } = mergeOps;
  const { resetCommitment } = useResetCommitment();
  const tabs = React.useMemo(() => {
    const { per_az: azs } = resource;
    const azUnaware = isAZUnaware(azs);
    const azNames = azs
      .map((az) => az.name)
      .filter((name) => name !== CustomZones.UNKNOWN)
      .filter((name) => (!azUnaware ? name !== CustomZones.ANY : true));
    return scope.isProject() ? [...azNames, CustomZones.MARKETPLACE] : azNames;
  }, [resource]);
  const azIndex = tabs.findIndex((tabName) => tabName === currentTab) || 0;

  function handleTabSelect() {
    setIsMerging(false);
    setCommitmentsToMerge([]);
    resetCommitment();
  }

  return (
    <Container px={false} className="pt-0 py-6 sticky top-[2rem] z-[100]">
      <Tabs selectedIndex={azIndex} onSelect={() => {}}>
        <TabList>
          {tabs.map((tabName) => {
            return (
              <Tab
                data-testid={`tab/${tabName}`}
                key={tabName}
                onClick={() => {
                  setCurrentTab(tabName);
                  handleTabSelect();
                }}
              >
                {tabName}
                {tabName == CustomZones.MARKETPLACE && publicCommitments.length > 0 && (
                  <ToolTipWrapper
                    trigger={<Icon className="mt-auto ml-1" size="16" icon="info" />}
                    content={<span className="font-normal">{publicCommitments.length} available.</span>}
                  />
                )}
              </Tab>
            );
          })}
          <Stack className="h-8 my-auto ml-auto mr-2" gap="1">
            {currentTab != CustomZones.MARKETPLACE && (
              <>
                {scope.isProject() && (
                  <>
                    {<AddCommitments label="Add" resource={resource} />}
                    <ReceiveCommitment />
                  </>
                )}
                <MergeCommitment mergeOps={mergeOps} />{" "}
              </>
            )}
          </Stack>
        </TabList>
        {tabs.map((tabName) => (
          <TabPanel key={tabName}></TabPanel>
        ))}
      </Tabs>
    </Container>
  );
};

export default AvailabilityZoneNav;
