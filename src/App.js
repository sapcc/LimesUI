import React from "react";

import {
  AppShell,
  AppShellProvider,
  Message,
  LoadingIndicator,
} from "juno-ui-components";
import StoreProvider, {
  apiStore,
  apiStoreActions,
  globalStoreActions,
} from "./components/StoreProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styles from "./styles.scss";
import { fetchProxyInitDB } from "utils";
import projectApiDB from "./lib/limes_project_api.json";
import cerebroApiDB from "./lib/cerebro_api.json";
import commitmentApiDB from "./lib/limes_commitment_api.json";
import dayPickerStyle from "react-day-picker/dist/style.css?inline";
import AsyncWorker from "./AsyncWorker";
import { Scope } from "./lib/scope";

/* --------------------------- */

const App = (props = {}) => {
  const queryClient = props.queryClient;
  const { setGlobalAPI } = apiStoreActions();
  const { setToken } = apiStoreActions();
  const { token } = apiStore();
  const { setScope } = globalStoreActions();
  const { projectID } = apiStore();
  const { apiReady } = apiStore();
  const [tokenError, setTokenError] = React.useState(false);
  const scope = new Scope(props);
  const Resource = scope.appComponent();

  React.useEffect(() => {
    setGlobalAPI({
      endpoint: props.endpoint || props.currentHost || "",
      // With a projectID set by DomainView, use the requested project ID.
      projectID: props.projectID || projectID || "",
      domainID: props.domainID || "",
    });
    setScope(scope);
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
    if (props.local) {
      console.log(token);
    }
    setToken(token.authToken);
    return timer;
  }

  // on app initial load save Endpoint and URL_STATE_KEY so it can be
  // used from overall in the application
  React.useEffect(() => {
    // set to empty string to fetch local test data in dev mode
    if (!window[props.getTokenFuncName]) {
      // Set an error if the getTokenFuncName function was not provided to the app.
      // In this case no token can be fetched
      setTokenError(true);
      setToken(props.token);
      return;
    }
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
          cerebro: [cerebroApiDB],
        },
        {
          debug: true,
          // replaces routes with a path to match the mock keys.
          // providing an ID causes the mock to return as an object instead of an Array.
          // ${x} refers to the x'th place of the subroute's generic entries.
          // example: $2 in "/(.*)/projects/(.*)" => {projectID}
          rewriteRoutes: {
            "/v1/domains/(.*)/projects/(.*)/commitments":
              "/projectCommitments/$2/commitments",
            "/v1/domains/(.*)/projects/(.*)": "/projects/$2",
            "(.*)/(.*)/resources/project/bigvm_resources": "/cerebro/bigvm_resources",
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
          <Resource {...props} />
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
