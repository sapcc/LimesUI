# @sapcc/limes-ui

## 1.10.0

### Minor Changes

- 905e365: update juno to v5, tailwind to v4

## 1.9.0

### Minor Changes

- 4d556a1: Add explanatory info segments for resources and availability zones. Make base quota easier to understand.

## 1.8.1

### Patch Changes

- fcfbb19: fix: table row to add a commitment not visible for resources without commitments

## 1.8.0

### Minor Changes

- ab90643: Upgrade the application to React 19
- 3505cd6: rework resource bars and their value calculation
- 46de594: Domain/Cluster level: Add project filtering by label. Improve clearance for commitment transfer"

### Patch Changes

- a056af4: fix: max_quota visiblity for users without edit permissions. Fix: edit panel display when switching between panels on domain level.
- 7540531: Add resource bar unit test. Checks the behavior for reported 0 value quota

## 1.7.1

### Patch Changes

- 17e862a: fix: max quota edit option to be available in the panel again

## 1.7.0

### Minor Changes

- a813a8b: Add table sorting for commitments

### Patch Changes

- 52b9eea: fix: unit parsing, which now parses provided negative values

## 1.6.1

### Patch Changes

- 93637a5: Fix: add missing tracksQuota property to the Panel component. Fix wrongly displayed quota bar values on usage only resources"

## 1.6.0

### Minor Changes

- 1cc35b2: Allow max-quota edits for resources without the resource having to allow commitments. Do not allow commitment actions for domains that do not allow commitments for the current displayed resource (cluster level change).

## 1.5.1

### Patch Changes

- e6edba7: disable commitment renewal actions on missing permissions
- 0750d2c: Update Juno to 3.0.0

## 1.5.0

### Minor Changes

- 4a00bc4: Add commitment merging to project, domain and cluster level

### Patch Changes

- aa6ec06: Add notification option for planned commitments

## 1.4.0

### Minor Changes

- c58a136: Add commitment renewal

## 1.3.9

### Patch Changes

- d72070e: adjust publish workflow to trigger on true release updates

## 1.3.8

### Patch Changes

- 23f5223: push workflows demand github.ref instead of head_ref

## 1.3.7

### Patch Changes

- 0db108d: updated dependencies

## 1.3.6

### Patch Changes

- c95f3bd: Add changeset.
