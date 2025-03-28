const RunLocators = require('../utils/run-locators');
const { expect } = require("@playwright/test");
const AssertionEngine = require("../utils/assertions");




class AutomationExcerciseLoginPage {
    constructor(page) {
        this.page = page;
        this.locators = new RunLocators(page, '../Locators/AutomationExcerciseLoginPage');
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async login(username, password) {
        console.log(`Logging in with: ${username} / ${password}`);

        const usernameInput = await this.locators.getLocator('usernameField');
        const passwordInput = await this.locators.getLocator('passwordField');
        const loginButton = await this.locators.getLocator('loginButton');
        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await loginButton.click();
    
        
    }

    async verifyLoginErrorMessage(expectedMessage) {
        const errorMessage = await this.locators.getLocator('errorMessage');
        const actualText = await errorMessage.textContent();
        AssertionEngine.assertEquals(actualText, expectedMessage);
    }
    

    async goToRegisterPage() {
        const registerLink = await this.locators.getLocator('registerLink');
        await registerLink.click();
    }
}

module.exports = AutomationExcerciseLoginPage;
