# LimesUI App

Provides an elektra interface for the new resource management and billing model for the CCloud OpenStack infrastructure. Utilizes the API endpoints provided by Limes.

A more detailed description about the architecture can be found here:
[Architecture](/architecture/architectureDescription.md)

## How to build

1. Install dependencies

```sh
npm install
```

2. Create an `appProps.json` file in the root directory with the following contents:

```s
{
  "endpoint": "https://endpoint",
  "projectID": "c9f269de-6fae-40ac-8468-b90c609c04c5",
  "domainID": "9e4ebc1e-3e83-4aa1-a0f6-a3303c96dc9e",
  "token": "wrouyhyt08q3uya3eoruyhw3el5uykjghasy5obyuqby5a",
  "canEdit": true,
  "mockAPI": false
  "theme": "theme-light",
  "embedded": false,
  "local": false,
}
```

If you would like to use the additional quota plugin application, add the following contents:

```s
{
  "quotaProject": "compute",
  "quotaAlign": "end"
}
```

| Field     | Type               | Description                                                                                                                                                                                                      |
| :-------- | :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| endpoint  | string             | Base URL of the Limes API as stored in the Keystone catalog                                                                                                                                                      |
| projectID | string             | Project ID (if scoped to a project)                                                                                                                                                                              |
| domainID  | string             | Domain ID (if scoped to a project or domain)                                                                                                                                                                     |
| token     | string             | Keystone token for the scope specified by `domain_id` and `project_id`                                                                                                                                           |
| canEdit   | boolean            | Whether the user has edit permissions in the token's scope                                                                                                                                                       |
| mockAPI   | boolean (optional) | Wheter the API data should be mocked. If the `mockAPI` attribute is set to `true` the endpint attribute becomes optional.                                                                                        |
| theme     | string (optional)  | Override the default theme. Possible values are `theme-light` or `theme-dark` (default).                                                                                                                         |
| embedded  | boolean (optional) | Set to `true` if the app is to be embedded in another existing app or page, like Elektra. If set to true the app won't render a page header/footer and will instead render only the content. Defaults to: false. |
| local     | boolean (optional) | Used to display debug log data in local development.                                                                                                                                                             |

3. Run the app:

```sh
APP_PORT=8000 npm run start
```

Then navigate to <http://localhost:8000/>.

## Instructions

The new calculation model is explained and provided at the [Limes API specifications](https://github.com/sapcc/limes/blob/master/docs/users/api-spec-resources.md)

- Visit the resource management section in elektra or use the local version of this UI.

- the resources available in the chosen project will be visible in a tile view.

- Resources that can be edited and have no commitments will be displayed in purple color. The resource bar displayed will have the following structrue:

```sh
<Usage>/<Available Quota>
```

- Resources that contain commitments will have the following structure:

```sh
<Usage>/<sum(Commitments)> | <Usage that exceeds Commitments>/<Remaining Quota>
```

- Resources that contain commitments that are not yet confirmed will have a `pending` label attached to them.

## Contribution

Please open a issue in this repository and state the feature or error that you would like to have addressed.

## Contact

If any other issues or questions arise, please contact `Stefan Voigt` in Slack or per Mail:
`s.voigt@sap.com`
