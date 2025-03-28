const fs = require('fs');
const path = require('path');

class RunLocators {
    constructor(page, jsonFilePath) {
        this.page = page;
        this.locators = this.loadLocators(jsonFilePath);
    }

    loadLocators(jsonFilePath) {
        try {
            const filePath = path.resolve(__dirname, jsonFilePath);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error(`Error loading locators from JSON: ${error.message}`);
            return {};
        }
    }

    async getLocator(elementName) {
        const locatorTypes = this.locators[elementName];
        if (!locatorTypes) {
            console.error(`Locator not found for element: ${elementName}`);
            return null;
        }
    
        for (const [type, locator] of Object.entries(locatorTypes)) {
            let elementLocator;
    
            switch (type) {
                case "css":
                case "xpath":
                    elementLocator = this.page.locator(locator);
                    break;
                case "id":
                    elementLocator = this.page.locator(`#${locator}`);
                    break;
                case "name":
                    elementLocator = this.page.locator(`[name="${locator}"]`);
                    break;
                case "placeholder":
                    elementLocator = this.page.locator(`input[placeholder="${locator}"]`);
                    break;
                case "label":
                    elementLocator = this.page.getByLabel(locator);
                    break;
                case "text":
                    elementLocator = this.page.getByText(locator);
                    break;
                case "testId":
                    elementLocator = this.page.getByTestId(locator);
                    break;
                case "role":
                    elementLocator = this.page.getByRole(locator.type, { name: locator.name });
                    break;
                default:
                    console.warn(`Unsupported locator type: ${type}`);
                    continue;
            }
    
            try {
                if (elementLocator && await elementLocator.isVisible()) {
                    console.log(`Found working locator for ${elementName}: ${type} -> ${locator}`);
                    return elementLocator;
                }
            } catch (error) {
                console.warn(`Failed locator for ${elementName}: ${type} -> ${locator} - Trying next...`);
            }
        }
    
        console.error(`No valid locator found for ${elementName}`);
        return null;
    }
    
}

module.exports = RunLocators;
