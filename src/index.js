import { getInput, setOutput, setFailed, info, getBooleanInput } from '@actions/core';
import { Octokit } from '@octokit/core';
import fetch from 'node-fetch';

async function run() {
    const parameters = {
        name: getInput('name'),
        value: getInput('value'),
        repository: getInput('repository'),
        token: getInput('token'),
        logOldValue: getBooleanInput('logOldValue'),
        org: getInput('org'),
        base: getInput('org') ? 'orgs' : 'repos',
        visibility: getInput('visibility'),
        selectedRepositoryIds: getInput('selectedRepositoryIds')
    };

    let oldValue;
    if (parameters.logOldValue) {
        oldValue = (await getVariable(parameters)).data.value;
    }

    const response = await updateVariable(parameters);

    if (response.status < 400) {
        setOutput('data', response.data);
        setOutput('status', response.status);

        if (parameters.logOldValue) {
            info(`Value of the variable ${parameters.name} changed from ${oldValue} to ${parameters.value}`);
        } else {
            info(`Value of the variable ${parameters.name} changed to ${parameters.value}`);
        }
    } else {
        handleError(
            Error(`Errorcode ${response.status} on updating the variable`).cause({
                message: response.data,
                status: response.status
            })
        );
    }
}

function updateVariable(parameters) {
    const octokit = new Octokit({
        auth: parameters.token,
        request: {
            fetch: fetch
        }
    });

    return octokit.request(`PATCH /${parameters.base}/${parameters.repository}/actions/variables/${parameters.name}`, {
        value: parameters.value,
        selected_repository_ids: parameters.selectedRepositoryIds,
        visibility: parameters.visibility
    });
}

function getVariable(parameters) {
    const octokit = new Octokit({
        auth: parameters.token,
        request: {
            fetch: fetch
        }
    });

    return octokit.request(`GET /${parameters.base}/${parameters.repository}/actions/variables/${parameters.name}`, {
        visibility: parameters.visibility
    });
}

function handleError(error) {
    setFailed('error message: ' + error.message);
    setFailed('error status: ' + error.status);
}

run();
