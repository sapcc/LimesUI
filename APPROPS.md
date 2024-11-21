# Approps Overview

The following Approps can be passed to the application:

```json
 "appProps": {
    "theme": {
      "value": "theme-dark",
      "type": "optional",
      "description": "Override the default theme. Possible values are theme-light or theme-dark (default)"
    },
    "endpoint": {
      "value": "",
      "type": "required",
      "description": "Base URL of the Limes API as stored in the Keystone catalog"
    },
    "projectID": {
      "value": "",
      "type": "required",
      "description": "Project ID (if scoped to a project)"
    },
    "domainID": {
      "value": "",
      "type": "required",
      "description": "Domain ID (if scoped to a project or domain)"
    },
    "token": {
      "value": "",
      "type": "required",
      "description": "Keystone token for the scope specified by domain_id and project_id"
    },
    "canEdit": {
      "value": false,
      "type": "required",
      "description": "Whether the user has edit permissions in the token's scope"
    },
    "embedded": {
      "value": false,
      "type": "optional",
      "description": "Set to true if app is to be embedded in another existing app or page, like e.g. Elektra.  If set to true the app won't render a page header/footer and instead render only the content. The default value is false."
    },
    "mockAPI": {
      "value": false,
      "type": "optional",
      "description": "Wheter the API data should be mocked."
    },
    "local": {
      "value": false,
      "type": "optional",
      "description": "Used to display debug log data in local development."
    },
    "quotaProject": {
      "value": "",
      "type": "optional",
      "description": "Identify the current project."
    },
    "quotaAlign": {
      "value": "",
      "type": "optional",
      "description": "Align the displayed quota text to start, center or end (default: end)"
    }
  },
```
