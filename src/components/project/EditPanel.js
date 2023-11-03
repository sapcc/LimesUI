import React from "react";
import { Panel, PanelBody } from "juno-ui-components";
import { useParams, useNavigate } from "react-router-dom";
import { t } from "../../lib/utils";
import { Unit } from "../../lib/unit";
import { tracksQuota } from "../../lib/utils";
import ProjectResource from "./ProjectResource";
import useStore from "../../lib/store/store";
import AvailabilityZoneNav from "./AvailabilityZoneNav";
import CommitmentTable from "../commitment/CommitmentTable";

// TODO: Replace hardcoded API data vs API-call. Get them via useEffect,[]
// TODO: OnClose and Edit case => Warning on Close modal should be added.

const EditPanel = (props) => {
  // Variables and State.
  const commitments = useStore((state) => state.commitments);
  const params = useParams();
  const navigate = useNavigate();
  const { currentArea, categoryName, resourceName } = { ...params };
  const res = props.categories[categoryName].resources.find((res) => {
    if (res.name === resourceName) {
      return res;
    }
  });
  const [currentAZ, setCurrentAZ] = React.useState(Object.keys(res.per_az)[0]);
  const [state, setState] = React.useState({
    inputs: null,
  });

  // Initializers
  React.useEffect(() => {
    // initialize the state of input form
    const unit = new Unit(res.unit);
    const inputs = {
      value: res.quota,
      text: unit.format(res.quota, { ascii: true }),
    };

    setState({ ...state, inputs });
  }, []);

  // Functions

  function close() {
    setState((state) => ({ ...state, show: !state.show }));
    navigate(`/${currentArea}`);
  }

  function handleInput(text) {
    alert(text);
  }

  return (
    <>
      <Panel
        size="large"
        opened={true}
        onClose={() => close()}
        closeable={true}
        heading={`Edit Commitment: ${t(categoryName)} - ${t(resourceName)}`}
      >
        <PanelBody>
          <ProjectResource
            resource={res}
            tracksQuota={tracksQuota(res)}
            edit={state.inputs}
            handleInput={handleInput}
          />

          <AvailabilityZoneNav
            az={res.per_az}
            currentAZ={currentAZ}
            setCurrentAZ={setCurrentAZ}
          />
          {commitments && (
            <CommitmentTable
              currentResource={res.name}
              currentAZ={currentAZ}
              commitmentData={commitments}
            />
          )}
        </PanelBody>
      </Panel>
    </>
  );
};

export default EditPanel;
