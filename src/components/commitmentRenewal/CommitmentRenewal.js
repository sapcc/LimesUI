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
  Message,
} from "@cloudoperators/juno-ui-components/index";
import RenewModal from "../commitment/Modals/RenewModal";
import { t, formatTimeISO8160 } from "../../lib/utils";
import { Unit, valueWithUnit } from "../../lib/unit";
import { categoryTitle } from "../paygAvailability/stylescss";
import { useMutation } from "@tanstack/react-query";
import { createCommitmentStoreActions } from "../StoreProvider";

export const renewableInfoText = "No renewable commitments found for this project.";
export const renewableInfoHint = [
  "You typically won't need to check this page proactively.",
  "We will send mail notifications when your active commitments are nearing expiration.",
];
export const inconsistentInfoText = "Resolve the state of the listed commitments first.";

const CommitmentRenewal = (props) => {
  const { renewable = [], inconsistent = [] } = props;
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
    { key: "Category", label: "Category" },
    { key: "resourceName", label: "Resource" },
    { key: "availabilityZone", label: "AZ" },
    { key: "amount", label: "Amount" },
    { key: "duration", label: "Duration" },
    { key: "confirmedAt", label: "Confirmed at" },
    { key: "expiresAt", label: "Expires at" },
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
    <div>
      {toast && (
        <Message variant="error" dismissible={true} onDismiss={() => setToast(null)}>
          <span className="whitespace-pre-line">{toast}</span>
        </Message>
      )}
      {hasRenewable ? (
        <div>
          {!hasInconsistencies && (
            <Message data-testid="inconsistentInfoHint" className="mb-2" dismissible={true}>
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
                <DataGridHeadCell key={headCell.key}>{headCell.label}</DataGridHeadCell>
              ))}
            </DataGridRow>
            {renewablePerService[selectedCategory]?.map((c) => {
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
                <DataGridHeadCell key={headCell.key}>{headCell.label}</DataGridHeadCell>
              ))}
            </DataGridRow>
            {inconsistent.map((c) => {
              return getTableData(c, false);
            })}
          </DataGrid>
        </div>
      )}
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
