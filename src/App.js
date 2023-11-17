import React from "react";

import { AppShell, AppShellProvider } from "juno-ui-components";
import StoreProvider, { useGlobalsActions } from "./components/StoreProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppContent from "./AppContent";
import styles from "./styles.scss";
import { fetchProxyInitDB } from "utils";
import projectApiDB from "./lib/limes_project_api.json";
import commitmentApiDB from "./lib/limes_commitment_api.json";

/* IMPORTANT: Replace this with your app's name */
const URL_STATE_KEY = "limesUI";
/* --------------------------- */

const App = (props = {}) => {
  const { setUrlStateKey } = useGlobalsActions();

  // Create query client which it can be used from overall in the app
  // set default endpoint to fetch data
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        meta: {
          endpoint: props.endpoint || props.currentHost || "",
          token: props.token || "",
          projectID: props.projectID || "",
          domainID: props.domainID || "",
        },
      },
    },
  });

  // on app initial load save Endpoint and URL_STATE_KEY so it can be
  // used from overall in the application
  React.useEffect(() => {
    // set to empty string to fetch local test data in dev mode
    setUrlStateKey(URL_STATE_KEY);
  }, []);

  React.useEffect(() => {
    if (props.mockAPI) {
      fetchProxyInitDB(
        {
          projects: [projectApiDB],
          projectCommitments: commitmentApiDB.projectCommitments,
        },
        {
          debug: true,
          rewriteRoutes: {
            "/v1/domains/(.*)/projects/(.*)/commitments":
              "/projectCommitments/$2/commitments",
            "/v1/domains/(.*)/projects/(.*)": "/projects/$2",
          },
        }
      );
    }
  }, [props.mockAPI]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        pageHeader="Converged Cloud | App limesUI"
        contentHeading={URL_STATE_KEY}
        embedded={props.embedded === "true" || props.embedded === true}
      >
        <AppContent {...props} />
      </AppShell>
    </QueryClientProvider>
  );
};

const StyledApp = (props) => {
  return (
    <AppShellProvider theme={`${props.theme ? props.theme : "theme-dark"}`}>
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <StoreProvider>
        <App {...props} />
      </StoreProvider>
    </AppShellProvider>
  );
};

export default StyledApp;
