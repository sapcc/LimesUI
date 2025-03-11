/**
 * Copyright 2025 SAP SE
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
import {
  Button,
  DataGrid,
  DataGridRow,
  DataGridCell,
  DataGridHeadCell,
  Select,
  SelectOption,
  Stack,
  Toast,
} from "@cloudoperators/juno-ui-components/index";
import RenewModal from "../commitment/Modals/RenewModal";
import { t, formatTimeISO8160 } from "../../lib/utils";
import { Unit, valueWithUnit } from "../../lib/unit";
import { categoryTitle } from "../paygAvailability/stylescss";
import { useMutation } from "@tanstack/react-query";
import { createCommitmentStoreActions } from "../StoreProvider";

const CommitmentRenewal = (props) => {
  const { renewable = [], inconsistent = [] } = props;
  const [displayedRenewables, setDisplayedRenewables] = React.useState(renewable);
  const [showModal, setShowModal] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const allCategoriesLabel = "All Categories";
  const selectedCategory = React.useRef(allCategoriesLabel);
  const commitmentsForModal = React.useRef();
  const commitmentRenew = useMutation({
    mutationKey: ["renewCommitment"],
  });
  const { setRefetchCommitmentAPI } = createCommitmentStoreActions();
  const headCells = [
    {
      key: "Category",
      label: "Category",
    },
    {
      key: "resourceName",
      label: "Resource",
    },
    {
      key: "amount",
      label: "Amount",
    },
    {
      key: "duration",
      label: "Duration",
    },
    {
      key: "confirmedAt",
      label: "Confirmed at",
    },
    {
      key: "expiresAt",
      label: "Expires at",
    },
  ];
  let renewableHeadCells = [...headCells];
  renewableHeadCells.push({ key: "renew", label: "Renew" });
  let inconsistencyHeadCells = [...headCells];
  inconsistencyHeadCells.push({ key: "reason", label: "Reason" });

  const renewablePerService = React.useMemo(() => {
    let result = renewable.reduce((map, c) => {
      if (!map[c.service_type]) {
        map[c.service_type] = [];
      }
      map[c.service_type].push(c);
      return map;
    }, {});
    result[allCategoriesLabel] = renewable;
    return result;
  }, [renewable]);

  function onRenewSelectionChange(value) {
    selectedCategory.current = value;
    setDisplayedRenewables(renewablePerService[value]);
  }

  function getTableData(c, showRenewable) {
    const unit = new Unit(c.unit);
    return (
      <DataGridRow key={c.id}>
        <DataGridCell>{t(c.service_type)}</DataGridCell>
        <DataGridCell>{t(c.resource_name)}</DataGridCell>
        <DataGridCell>{valueWithUnit(c.amount, unit)}</DataGridCell>
        <DataGridCell>{c.duration}</DataGridCell>
        <DataGridCell>{formatTimeISO8160(c.confirmed_at)}</DataGridCell>
        <DataGridCell>{formatTimeISO8160(c.expires_at)}</DataGridCell>
        {showRenewable && (
          <DataGridCell>
            <Button
              className="w-10"
              icon="openInNew"
              size="small"
              variant="primary"
              onClick={() => {
                setShowModal(true);
                commitmentsForModal.current = [c];
              }}
            />
          </DataGridCell>
        )}
        {!showRenewable && <DataGridCell>{c.reason}</DataGridCell>}
      </DataGridRow>
    );
  }

  function onRenew(commitments) {
    let payload = { commitment_ids: [] };
    commitments.forEach((c) => payload.commitment_ids.push(c.id));
    commitmentRenew.mutate(
      {
        payload: payload,
      },
      {
        onSuccess: () => {
          setRefetchCommitmentAPI(true);
        },
        onError: (error) => {
          setToast(error.toString());
        },
      }
    );
  }

  return (
    <div>
      {toast && <Toast className={"pb-0"} text={toast} variant="error" onDismiss={() => setToast(null)} />}
      <div className={categoryTitle}>Renewable Commitments</div>
      <Stack className="mb-4" alignment="center" gap="2">
        <div className="whitespace-nowrap">Renew commitments for:</div>
        <Select
          className="w-48"
          width="auto"
          defaultValue={selectedCategory.current}
          onValueChange={(value) => onRenewSelectionChange(value)}
        >
          {Object.keys(renewablePerService).map((renewable) => (
            <SelectOption key={renewable} value={renewable} label={t(renewable)} />
          ))}
        </Select>
        <Button
          className="w-10"
          icon="openInNew"
          variant="primary"
          onClick={() => {
            setShowModal(true);
            commitmentsForModal.current = renewablePerService[selectedCategory.current];
          }}
        />
      </Stack>
      <DataGrid columns={renewableHeadCells.length} className={"mb-10"}>
        <DataGridRow>
          {renewableHeadCells.map((headCell) => (
            <DataGridHeadCell key={headCell.key}>{headCell.label}</DataGridHeadCell>
          ))}
        </DataGridRow>
        {displayedRenewables.map((c) => {
          return getTableData(c, true);
        })}
      </DataGrid>
      <div className={categoryTitle}>Inconsistencies</div>
      <DataGrid columns={inconsistencyHeadCells.length}>
        <DataGridRow>
          {inconsistencyHeadCells.map((headCell) => (
            <DataGridHeadCell key={headCell.key}>{headCell.label}</DataGridHeadCell>
          ))}
        </DataGridRow>
        {inconsistent.map((c) => {
          return getTableData(c, false);
        })}
      </DataGrid>
      {showModal && (
        <RenewModal
          title="Renew Commitments"
          subText="renew"
          action={onRenew}
          commitments={commitmentsForModal.current}
          onModalClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CommitmentRenewal;
