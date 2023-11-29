import React from "react";

import { AppShell, AppShellProvider, Message } from "juno-ui-components";
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
  const [token, setToken] = React.useState(null);
  const [tokenError, setTokenError] = React.useState(true);

  // Create query client which it can be used from overall in the app
  // set default endpoint to fetch data
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        meta: {
          endpoint: props.endpoint || props.currentHost || "",
          token: token || "",
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
    if (!window[props.getTokenFuncName]) {
      setTokenError(true);
      setToken(props.token);
      return;
    }
    setUrlStateKey(URL_STATE_KEY);
    window[props.getTokenFuncName]().then((token) => {
      setToken(token.authToken);
    });
  }, []);

  React.useEffect(() => {
    if (token) {
      setTokenError(false);
    }
  }, [token]);

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

  return tokenError ? (
    <Message>
      Failed to fetch a token. Please provide a token as property or provide a
      getTokenFunc.
    </Message>
  ) : (
    token && (
      <QueryClientProvider client={queryClient}>
        <AppShell
          pageHeader="Converged Cloud | App limesUI"
          contentHeading={URL_STATE_KEY}
          embedded={props.embedded === "true" || props.embedded === true}
        >
          <AppContent {...props} />
        </AppShell>
      </QueryClientProvider>
    )
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
