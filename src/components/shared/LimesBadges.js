import React from "react";
import { Badge } from "juno-ui-components";
import { unusedCommitments, uncommittedUsage  } from "../../lib/utils";

const DomainBadges = (props) => {
  const { resource, az } = props;
  const { quota } = resource;
  if (quota == 0) return;
  return (
    <span>
      {unusedCommitments(az.commitmentSum, az[1].usage) && (
        <Badge variant="info">
          {" "}
          <b>unused</b>
        </Badge>
      )}
      {uncommittedUsage(az.commitmentSum, az[1].usage) && (
        <Badge variant="info">
          {" "}
          <b>uncommitted</b>
        </Badge>
      )}
    </span>
  );
};

const ProjectBadges = (props) => {
  const { az } = props;
  const pending = az.pending_commitments;
  const planned = az.planned_commitments;
  return (
    <span>
      {pending && (
        <Badge variant="info">
          {" "}
          <b>+ pending</b>
        </Badge>
      )}
      {planned && (
        <Badge variant="info" className={`${pending && "ml-1"}`}>
          {" "}
          <b>+ planned</b>
        </Badge>
      )}
    </span>
  );
};

export { DomainBadges, ProjectBadges };
