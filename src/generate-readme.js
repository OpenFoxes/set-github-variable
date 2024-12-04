import * as fs from 'fs';

export const generateReadme = (version) => {
    if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
        console.error('Semantic version number expected!');

        return;
    }

    const readme = `${generateHeader(version)}

${generateInfo()}

${generateCodeQuality()}

${generateUsage(version)}

${generatePreRequieries()}

${generateCustomizing()}

${generateDevelopment()}
`;

    try {
        fs.writeFileSync('./README.md', readme);
    } catch (err) {
        if (err !== null) {
            console.error('Fehler beim Generieren der Readme-Datei!', err);
        }
    }
};

const generateHeader = (version) => {
    return `<div align="center">
  📦
</div>
<h1 align="center">
    set-github-variable
</h1>

<p align="center">
   A GitHub Action for updating Github Variables
</p>

<p align="center">
   Version ${version}
</p>

<br />`;
};

const generateInfo = () => {
    return `## Information

With this Github Action you are able to **modify Repository Variables** right from your _Github Workflow_.
It is very easy to integrate in your project, just take a look at the "Usage"-section.`;
};

const generateCodeQuality = () => {
    return `### Code Quality

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=OpenFoxes_set-github-variable)](https://sonarcloud.io/summary/new_code?id=OpenFoxes_set-github-variable)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=OpenFoxes_set-github-variable&metric=bugs)](https://sonarcloud.io/summary/new_code?id=OpenFoxes_set-github-variable)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=OpenFoxes_set-github-variable&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=OpenFoxes_set-github-variable)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=OpenFoxes_set-github-variable&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=OpenFoxes_set-github-variable)`;
};

const generateUsage = (version) => {
    return `## Usage

Updates [Github Variable](https://docs.github.com/en/actions/learn-github-actions/variables#creating-configuration-variables-for-a-repository) for a repository or organization.

\`\`\`YAML
- uses: openfoxes/set-github-variable@v${version}
  with:
      name: 'SAMPLE_VAR'
      value: 'Hello World'
      repository: openfoxes/set-github-variable
      token: \${{ secrets.REPO_ACCESS_TOKEN }}
\`\`\``;
};

const generatePreRequieries = () => {
    return `### Pre-requisites

1. Create a [Github Variable](https://docs.github.com/en/actions/learn-github-actions/variables#creating-configuration-variables-for-a-repository) for your repo/organization.
2. Create an access token with access to manage actions repository variables.

It does not require to do \`checkout\` and it's independent on the Github runner/docker container used.`;
};

const generateCustomizing = () => {
    return `### Customizing

#### inputs

Inputs marked as "Required" must be set.

| Name          | Type    | Required | Default | Description                                                                                                     |
| ------------- | ------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| \`name\`        | String  | Yes      |         | Variable name                                                                                                   |
| \`value\`       | String  | Yes      |         | Variable value                                                                                                  |
| \`repository\`  | String  | Yes      |         | Repository name, with format \`<organization>/<repository>\` i.e \`openfoxes/set-github-variable\`                  |
| \`token\`       | String  | Yes      |         | [Repository Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) |
| \`logOldValue\` | Boolean | No       | \`true\`  | Enables/Disables logging of the previous variable value                                                         |

The following are to be provided when the value is Org scoped instead of a repository variable:

| Name                    | Type            | Description                                                                                                                                                                            |
| ----------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \`org\`                   | Boolean         | Details if the variable belongs to an [organization](https://docs.github.com/en/github/setting-up-and-managing-organizations-and-teams/about-organizations) (default is \`false\`)       |
| \`visibility\`            | String          | Configures access to the repositorys in the org, see [more](https://docs.github.com/en/rest/actions/variables?apiVersion=2022-11-28#update-an-organization-variable)                   |
| \`selectedRepositoryIds\` | String[Integer] | Array of repositories ids where to update the org-scoped variable, see [more](https://docs.github.com/en/rest/actions/variables?apiVersion=2022-11-28#update-an-organization-variable) |

#### outputs

The following outputs can be accessed via \`\${{ steps.<step-id>.outputs }}\` from this action

| Name     | Type    | Description                   |
| -------- | ------- | ----------------------------- |
| \`data\`   | String  | Response data from Github API |
| \`status\` | Integer | Response code from Github API |`;
};

const generateDevelopment = () => {
    return `## Development

This repository is based on https://github.com/mmoyaferrer/set-github-variable.
It should be kept up to date, so feel free to open issues or suggest solutions.
This fork is intended as a progression on the original repository and will be developed in parallel.
I will try to keep it based on the original one, if there are any updates.`;
};
