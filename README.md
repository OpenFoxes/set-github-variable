<div align="center">
  📦
</div>
<h1 align="center">
    set-github-variable
</h1>

<p align="center">
   A GitHub Action for updating Github Variables
</p>

<p align="center">
   Version 1.3.1
</p>

<br />

## Information

With this Github Action you are able to **modify Repository Variables** right from your _Github Workflow_.
It is very easy to integrate in your project, just take a look at the "Usage"-section.

### Code Quality

This project aims to provide a clean and secure design.
In order to optimize the underlying code and reducing the risk of bugs, quality tools are used:

<p align="center">
    <a href="https://sonarcloud.io/summary/new_code?id=OpenFoxes_set-github-variable"><img src="https://sonarcloud.io/api/project_badges/quality_gate?project=OpenFoxes_set-github-variable" alt="Quality gate" /></a>
</p>

<p align="center">
    <a href="https://sonarcloud.io/summary/new_code?id=OpenFoxes_set-github-variable"><img src="https://sonarcloud.io/api/project_badges/measure?project=OpenFoxes_set-github-variable&metric=bugs" alt="Bugs" /></a>
    <a href="https://sonarcloud.io/summary/new_code?id=OpenFoxes_set-github-variable"><img src="https://sonarcloud.io/api/project_badges/measure?project=OpenFoxes_set-github-variable&metric=code_smells" alt="Code Smells" /></a>
    <a href="https://sonarcloud.io/summary/new_code?id=OpenFoxes_set-github-variable"><img src="https://sonarcloud.io/api/project_badges/measure?project=OpenFoxes_set-github-variable&metric=duplicated_lines_density" alt="Duplicated Lines (%)" /></a>
</p>

## Usage

Updates [Github Variable](https://docs.github.com/en/actions/learn-github-actions/variables#creating-configuration-variables-for-a-repository) for a repository or organization.

```YAML
- uses: openfoxes/set-github-variable@v1.3.1
  with:
      name: 'SAMPLE_VAR'
      value: 'Hello World'
      repository: openfoxes/set-github-variable
      token: ${{ secrets.REPO_ACCESS_TOKEN }}
```

### Pre-requisites

1. Create a [Github Variable](https://docs.github.com/en/actions/learn-github-actions/variables#creating-configuration-variables-for-a-repository) for your repo/organization.
2. Create an access token with access to manage actions repository variables.

It does not require to do `checkout` and it's independent on the Github runner/docker container used.

### Customizing

#### inputs

Inputs marked as "Required" must be set.

| Name          | Type    | Required | Default | Description                                                                                                     |
| ------------- | ------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `name`        | String  | Yes      |         | Variable name                                                                                                   |
| `value`       | String  | Yes      |         | Variable value                                                                                                  |
| `repository`  | String  | Yes      |         | Repository name, with format `<organization>/<repository>` i.e `openfoxes/set-github-variable`                  |
| `token`       | String  | Yes      |         | [Repository Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) |
| `logOldValue` | Boolean | No       | `true`  | Enables/Disables logging of the previous variable value                                                         |

The following are to be provided when the value is Org scoped instead of a repository variable:

| Name                    | Type            | Description                                                                                                                                                                            |
| ----------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `org`                   | Boolean         | Details if the variable belongs to an [organization](https://docs.github.com/en/github/setting-up-and-managing-organizations-and-teams/about-organizations) (default is `false`)       |
| `visibility`            | String          | Configures access to the repositorys in the org, see [more](https://docs.github.com/en/rest/actions/variables?apiVersion=2022-11-28#update-an-organization-variable)                   |
| `selectedRepositoryIds` | String[Integer] | Array of repositories ids where to update the org-scoped variable, see [more](https://docs.github.com/en/rest/actions/variables?apiVersion=2022-11-28#update-an-organization-variable) |

#### outputs

The following outputs can be accessed via `${{ steps.<step-id>.outputs }}` from this action

| Name     | Type    | Description                   |
| -------- | ------- | ----------------------------- |
| `data`   | String  | Response data from Github API |
| `status` | Integer | Response code from Github API |

## Development

This repository is based on https://github.com/mmoyaferrer/set-github-variable.
It should be kept up to date, so feel free to open issues or suggest solutions.
This fork is intended as a progression on the original repository and will be developed in parallel.
I will try to keep it based on the original one, if there are any updates.
