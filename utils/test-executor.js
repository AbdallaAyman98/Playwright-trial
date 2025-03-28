const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");

// Function to dynamically import the correct page object
async function getPageObject(page, pageName) {
    try {
        const PageObject = require(`../GlobalActions/${pageName}.js`); // Dynamically load the class
        return new PageObject(page); // Instantiate with Playwright page
    } catch (error) {
        throw new Error(`Failed to load page object: ${pageName} - ${error.message}`);
    }
}

// Execute a single test step
async function executeTestStep(page, step) {
    const { page: pageName, action, args, description } = step; // Add 'description' field from YAML
    try {
        console.log(`Step: ${description || `Executing ${pageName}.${action}`}`); // Show readable step
        const pageObject = await getPageObject(page, pageName);

        if (typeof pageObject[action] === "function") {
            const stringArgs = (args || []).map(arg => String(arg));
            await pageObject[action](...stringArgs);
            console.log(`Success: ${description || `${pageName}.${action} executed.`}`);
        } else {
            console.error(`Error: Function "${action}" not found in "${pageName}"`);
        }
    } catch (error) {
        console.error(`Error in "${description || `${pageName}.${action}`}" - ${error.message}`);
    }
}


// Execute the full test workflow
async function executeTestWorkflow(page, testWorkFlow) {
    for (const step of testWorkFlow.steps) {
        await executeTestStep(page, step);
    }
}

module.exports = { executeTestWorkflow };
