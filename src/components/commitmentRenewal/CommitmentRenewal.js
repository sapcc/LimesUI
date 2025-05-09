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
  Select,
  SelectOption,
  Stack,
  Message,
} from "@cloudoperators/juno-ui-components/index";
import RenewModal from "../commitment/Modals/RenewModal";
import { t, formatTimeISO8160 } from "../../lib/utils";
import { Unit, valueWithUnit } from "../../lib/unit";
import { categoryTitle } from "../paygAvailability/stylescss";
import useSortTableData from "../../hooks/useSortTable";
import { useMutation } from "@tanstack/react-query";
import { createCommitmentStoreActions } from "../StoreProvider";

export const renewableInfoText = "No renewable commitments found for this project.";
export const renewableInfoHint = [
  "You will usually not need to check this page proactively.",
  "We will send mail notifications when active commitments are about to expire.",
];
export const inconsistentInfoText = "Resolve the state of the listed commitments first.";
export const missingRole =
  "You are missing the permissions to edit this page. Please forward this page to a resource admin.";

const CommitmentRenewal = (props) => {
  const { renewable = [], inconsistent = [], canEdit = false, sortConfig = [] } = props;
  const hasRenewable = renewable.length > 0;
  const hasInconsistencies = inconsistent.length > 0;
  const [showModal, setShowModal] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const allCategoriesLabel = "All Categories";
  const [selectedCategory, setSelectedCategory] = React.useState(allCategoriesLabel);
  const commitmentsForModal = React.useRef();
  const commitmentRenew = useMutation({ mutationKey: ["renewCommitment"] });
  const { setRefetchCommitmentAPI } = createCommitmentStoreActions();
  const headCells = [
    { key: "service_type", label: "Category" },
    { key: "resource_name", label: "Resource" },
    { key: "availability_zone", label: "AZ" },
    { key: "amount", label: "Amount" },
    { key: "duration", label: "Duration" },
    { key: "confirmed_at", label: "Confirmed at" },
    { key: "expires_at", label: "Expires at" },
  ];
  let renewableHeadCells = [...headCells];
  renewableHeadCells.push({ key: "renew", label: "Renew" });
  let inconsistencyHeadCells = [...headCells];
  inconsistencyHeadCells.push({ key: "reason", label: "Reason" });

  const renewablePerService = React.useMemo(() => {
    const renewableResult = renewable.reduce((obj, c) => {
      if (!obj[c.service_type]) {
        obj[c.service_type] = [];
      }
      obj[c.service_type].push(c);
      return obj;
    }, {});
    let allCategories = {};
    allCategories[allCategoriesLabel] = renewable;
    const result = Object.assign(allCategories, renewableResult);
    return result;
  }, [renewable]);

  const { items: renewableItems, TableSortHeader: RenewableHeader } = useSortTableData(
    renewablePerService[selectedCategory],
    sortConfig
  );
  const { items: inconistentItems, TableSortHeader: InconstentcyHeader } = useSortTableData(
    inconsistent,
    sortConfig
  );

  function onRenewSelectionChange(value) {
    setSelectedCategory(value);
  }

  function getTableData(c, showRenewable) {
    const unit = new Unit(c.unit);
    return (
      <DataGridRow key={c.id}>
        <DataGridCell>{t(c.service_type)}</DataGridCell>
        <DataGridCell>{t(c.resource_name)}</DataGridCell>
        <DataGridCell>{c.availability_zone}</DataGridCell>
        <DataGridCell>{valueWithUnit(c.amount, unit)}</DataGridCell>
        <DataGridCell>{c.duration}</DataGridCell>
        <DataGridCell>{formatTimeISO8160(c.confirmed_at)}</DataGridCell>
        <DataGridCell>{formatTimeISO8160(c.expires_at)}</DataGridCell>
        {showRenewable && (
          <DataGridCell>
            <Button
              disabled={!canEdit}
              data-testid={"renew" + c.id}
              title="Renew Commitment"
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

  async function onRenew(commitments) {
    const errors = [];
    for (const c of commitments) {
      try {
        await commitmentRenew.mutateAsync({ commitmentID: c.id });
      } catch (error) {
        errors.push(error.toString());
      }
    }
    if (errors.length > 0) {
      setToast(errors.join("\n"));
    }
    setRefetchCommitmentAPI(true);
    setShowModal(false);
  }

  return (
    <>
      {toast && (
        <Message variant="error" dismissible={true} onDismiss={() => setToast(null)}>
          <span className="whitespace-pre-line">{toast}</span>
        </Message>
      )}
      {!canEdit && <Message className={"mb-1"} variant="warning" text={missingRole} />}
      {hasRenewable ? (
        <div>
          {!hasInconsistencies && (
            <Message data-testid="infoHint" className="mb-2" dismissible={true}>
              {renewableInfoHint.map((hint, i) => (
                <div key={i}>{hint}</div>
              ))}
            </Message>
          )}
          <div className={categoryTitle}>Renewable Commitments</div>
          <Stack className="mb-4" alignment="center" gap="2">
            <div className="whitespace-nowrap">Renew commitments for:</div>
            <Select
              data-testid={"renewSelect"}
              className="w-48"
              width="auto"
              defaultValue={selectedCategory}
              onValueChange={(value) => onRenewSelectionChange(value)}
            >
              {Object.keys(renewablePerService).map((renewable) => (
                <SelectOption data-testid={renewable} key={renewable} value={renewable} label={t(renewable)} />
              ))}
            </Select>
            <Button
              disabled={!canEdit}
              data-testid="renewMultiple"
              title="Renew all"
              className="w-10"
              icon="openInNew"
              variant="primary"
              onClick={() => {
                setShowModal(true);
                commitmentsForModal.current = renewablePerService[selectedCategory];
              }}
            />
          </Stack>
          <DataGrid columns={renewableHeadCells.length} className={"mb-10"}>
            <DataGridRow>
              {renewableHeadCells.map((headCell) => (
                <RenewableHeader key={headCell.key} identifier={headCell.key} value={headCell.label} />
              ))}
            </DataGridRow>

            {renewableItems.map((c) => {
              return getTableData(c, true);
            })}
          </DataGrid>
        </div>
      ) : (
        <Message className="mb-4 font-medium" variant="info" dismissible={true}>
          <div>{renewableInfoText}</div>
          {renewableInfoHint.map((hint, i) => (
            <div key={i}>{hint}</div>
          ))}
          {hasInconsistencies && <div>{inconsistentInfoText}</div>}
        </Message>
      )}
      {hasInconsistencies && (
        <div>
          <div className={categoryTitle}>
            Expiring commitments that were not confirmed and therefore cannot be renewed
          </div>
          <DataGrid columns={inconsistencyHeadCells.length}>
            <DataGridRow>
              {inconsistencyHeadCells.map((headCell) => (
                <InconstentcyHeader key={headCell.key} identifier={headCell.key} value={headCell.label} />
              ))}
            </DataGridRow>
            {inconistentItems.map((c) => {
              return getTableData(c, false);
            })}
          </DataGrid>
        </div>
      )}
      <RenewModal
        open={showModal}
        title="Renew Commitments"
        subText="renew"
        action={onRenew}
        commitments={commitmentsForModal.current}
        onModalClose={() => setShowModal(false)}
      />
    </>
  );
};

export default CommitmentRenewal;
