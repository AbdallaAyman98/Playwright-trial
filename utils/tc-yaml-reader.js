const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");



function loadTestSteps(testCaseNum, functionalArea, app) {
    const projectRoot = path.resolve(__dirname, ".."); // Get the root (assuming script is in a subfolder)
    const filePath = path.join(
        projectRoot, "tests", `${app}${functionalArea}Tests`, `${testCaseNum}.yaml`
    );
    
    try {
        const fileContent = fs.readFileSync(filePath, "utf8");
        const parsedData = yaml.load(fileContent);
        console.log("Loaded YAML Test Data:", JSON.stringify(parsedData, null, 2));
        return parsedData;
    } catch (error) {
        console.error(`Error reading YAML file: ${error.message}`);
        return null;
    }
}


module.exports = {loadTestSteps};



