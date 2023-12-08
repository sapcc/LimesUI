import React from "react";

import {
  AppShell,
  AppShellProvider,
  Message,
  LoadingIndicator,
} from "juno-ui-components";
import StoreProvider, { useGlobalsActions } from "./components/StoreProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppContent from "./AppContent";
import styles from "./styles.scss";
import { fetchProxyInitDB } from "utils";
import projectApiDB from "./lib/limes_project_api.json";
import commitmentApiDB from "./lib/limes_commitment_api.json";
import dayPickerStyle from "react-day-picker/dist/style.css?inline";
import useStore from "./lib/store/store";
import AsyncWorker from "./AsyncWorker";

/* IMPORTANT: Replace this with your app's name */
const URL_STATE_KEY = "limesUI";
/* --------------------------- */

const App = (props = {}) => {
  const queryClient = props.queryClient;
  const setGlobalApi = useStore((state) => state.setGlobalAPI);
  const setToken = useStore((state) => state.setToken);
  const token = useStore((state) => state.globalAPI.token);
  const apiReady = useStore((state) => state.globalAPI.apiReady);
  const [tokenError, setTokenError] = React.useState(false);
  const { setUrlStateKey } = useGlobalsActions();

  React.useEffect(() => {
    setGlobalApi({
      endpoint: props.endpoint || props.currentHost || "",
      token: props.getToken || "",
      projectID: props.projectID || "",
      domainID: props.domainID || "",
    });
  }, []);

  // Reload page after token timeout.
  async function getToken() {
    console.log("trying to fetch a new token");
    const token = await window[props.getTokenFuncName]();
    const expirationDate = token.expires_at;
    const expirationMillis = new Date(expirationDate).getTime();
    let timeout;
    if (expirationMillis) {
      timeout = new Date(token.expires_at).getTime() - Date.now();
    } else {
      timeout = 3610000; // Fallback to 1 hour.
    }
    const timer = setTimeout(() => {
      getToken();
    }, timeout);
    console.log(token);
    setToken(token.authToken);
    return timer;
  }

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
    const timer = getToken();
    return () => clearTimeout(timer);
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
    <QueryClientProvider client={queryClient}>
      <style>{dayPickerStyle}</style>
      <AsyncWorker mockAPI={props.mockAPI} />
      <AppShell
        pageHeader="Converged Cloud | App limesUI"
        embedded={props.embedded === "true" || props.embedded === true}
      >
        {apiReady ? (
          <AppContent {...props} />
        ) : (
          <LoadingIndicator className={"m-auto"} />
        )}
      </AppShell>
    </QueryClientProvider>
  );
};

const StyledApp = (props) => {
  // Create query client which it can be used from overall in the app
  // set default endpoint to fetch data
  const queryClient = new QueryClient();
  return (
    <AppShellProvider theme={`${props.theme ? props.theme : "theme-dark"}`}>
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <StoreProvider>
        <App {...props} queryClient={queryClient} />
      </StoreProvider>
    </AppShellProvider>
  );
};

export default StyledApp;
