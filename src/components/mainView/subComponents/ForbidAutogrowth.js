// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

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
        <div data-testid="forbidAutogrowthConfirmText">
          Do you want to <strong>{autogrowthForbidden ? "disable" : "enable"}</strong> Pay-As-You-Go?
          {autogrowthForbidden && (
            <p className="text-sm mt-2">
              Disabling will limit your available quota to either your existing commitments or your current usage,
              whichever value is greater. Changes to this setting typically take around 15 minutes to take effect.
            </p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ForbidAutogrowth;
