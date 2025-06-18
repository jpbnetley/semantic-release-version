# semantic-release-version
> A GitHub Action and Node.js utility for updating semantic version numbers (`major.minor.patch`) based on a specified release type.

## Features
- Updates semantic version strings according to release type (`major`, `minor`, `patch`)
- TypeScript support and tested with Vitest

## Usage

### As a GitHub Action

Add the following step to your workflow:

```yaml
- name: Update semantic version
  uses: jpbnetley/npm-version-release-action
  with:
    version: '1.2.3'
    version-type: 'minor'
```

#### Inputs

- `version`: The current version string (required, e.g. `1.2.3`)
- `version-type`: The type of version bump (`major`, `minor`, `patch`)

#### Outputs

- `new-version`: The new semantic version after applying the bump


## Development

### Install dependencies

```sh
pnpm install
```

### Run tests

```sh
pnpm run test
```

### Build

```sh
pnpm run build
```