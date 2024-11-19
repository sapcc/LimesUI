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
import { Button } from "@cloudoperators/juno-ui-components";
import { initialCommitmentObject } from "../../lib/constants";
import { globalStore, createCommitmentStore, createCommitmentStoreActions } from "../StoreProvider";

const AddCommitments = (props) => {
  const { label, size, disabled } = props;
  const { scope } = globalStore();
  const { setCommitment } = createCommitmentStoreActions();
  const { isCommitting } = createCommitmentStore();
  const { setIsCommitting } = createCommitmentStoreActions();
  const active = disabled || isCommitting;

  return (
    <Button
      data-cy="addCommitment"
      onClick={() => {
        // On Cluster/Domain View a project can be transferred, therefore we reset it first
        // Otherwise there will be key conflicts with the Commitment Table.
        if (scope.isCluster() || scope.isDomain()) {
          setCommitment({ ...initialCommitmentObject });
        }
        setIsCommitting(true);
      }}
      variant="primary"
      disabled={active}
      icon={scope.isProject() ? "addCircle" : undefined}
      size={size}
    >
      {label}
    </Button>
  );
};

export default AddCommitments;
