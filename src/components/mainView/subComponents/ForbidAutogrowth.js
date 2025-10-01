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
import { Icon, Message, Modal, Spinner, Switch } from "@cloudoperators/juno-ui-components/index";
import ToolTipWrapper from "../../shared/ToolTipWrapper";
import { useMutation } from "@tanstack/react-query";
import { projectStoreActions } from "../../StoreProvider";
import { Unit } from "../../../lib/unit";

const ForbidAutogrowth = (props) => {
  const { editMode = false } = props;
  const { resource, serviceType } = props;
  const { setRefetchProjectAPI } = projectStoreActions();
  const [autogrowthForbidden, setAutogrowthForbidden] = React.useState(resource?.forbid_autogrowth ?? false);
  const [showModal, setShowModal] = React.useState(false);
  const mutatation = useMutation({ mutationKey: ["forbidAutogrowth"] });
  const maxQuotaValue = resource?.max_quota;
  const unit = new Unit(resource?.unit);

  function handleAction(autogrowthForbidden) {
    const parseTarget = {
      project: {
        services: [
          {
            type: serviceType,
            resources: [
              {
                name: resource.name,
                forbid_autogrowth: autogrowthForbidden,
              },
            ],
          },
        ],
      },
    };

    mutatation.mutate(
      { payload: parseTarget },
      {
        onSuccess: () => {
          setRefetchProjectAPI(true);
          setShowModal(false);
        },
      }
    );
  }

  return (
    <>
      <span className={"gap-1 inline-flex"}>
        {mutatation.isLoading && <Spinner className="mr-0" />}
        Disable PAYG:
        {maxQuotaValue >= 0 && (
          <ToolTipWrapper
            trigger={<Icon icon="info" size="18" />}
            content={`Current Max-Quota: ${unit.format(maxQuotaValue)}`}
          />
        )}
        <Switch
          data-testid="forbidAutogrowthSwitch"
          on={autogrowthForbidden}
          disabled={!editMode}
          onClick={() => {
            setAutogrowthForbidden(!autogrowthForbidden);
            setShowModal(true);
          }}
        />
      </span>
      <Modal
        open={showModal}
        heading="Pay-As-You-Go"
        confirmButtonLabel="Yes"
        cancelButtonLabel="No"
        onConfirm={() => {
          handleAction(autogrowthForbidden);
        }}
        onCancel={() => {
          setAutogrowthForbidden(!autogrowthForbidden);
          setShowModal(false);
          mutatation.reset();
        }}
      >
        {mutatation.isError && (
          <Message
            data-testid="forbidAutgrowthError"
            className="mb-2"
            variant="error"
            text={mutatation.error.message}
          />
        )}
        <p data-testid="forbidAutogrowthConfirmText">
          Do you want to <strong>{autogrowthForbidden ? "disable" : "enable"}</strong> Pay-As-You-Go?
          {autogrowthForbidden && (
            <div className="text-sm mt-2">
              Disabling will limit your available quota to either your existing commitments or your current usage,
              whichever value is greater. Changes to this setting typically take around 15 minutes to take effect.
            </div>
          )}
        </p>
      </Modal>
    </>
  );
};

export default ForbidAutogrowth;
