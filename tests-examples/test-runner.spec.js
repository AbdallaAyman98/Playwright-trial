const { test, chromium } = require("@playwright/test");
const {loadTestSteps} = require("../utils/tc-yaml-reader");
const { executeTestWorkflow } = require("../utils/test-executor");


const testCaseID = "TC_0001";
const functionalArea = "Login"
const app = "AutomationExcercise"

test.describe("Loading Test Workflow", () => {  
    let testWorkFlow;

    test.beforeAll(async () => {
        testWorkFlow = await loadTestSteps(testCaseID, functionalArea, app);
        if (!testWorkFlow?.testName) {
            throw new Error("Test workflow failed to load or testName is missing.");
        }
    });

    test.describe(`${testCaseID}: ${testWorkFlow?.testName || "Default Test Name"}`, () => {
        test(testWorkFlow?.testName || "Unnamed Test", async ({}) => {
            console.log(`Running test: ${testWorkFlow.testName}`);
            const browser = await chromium.launch({ headless: false });
            const context = await browser.newContext();
            const page = await context.newPage();

            try {
                await executeTestWorkflow(page, testWorkFlow);
            } finally {
                await browser.close();
            }
        });
    });
});
