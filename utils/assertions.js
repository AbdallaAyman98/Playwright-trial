const { expect } = require("@playwright/test");

class GlobalAssertions {
    /**
     * Assert that a condition is true
     * @param {boolean} condition
     * @param {string} message
     */
    static assertTrue(condition, message = "Expected condition to be true") {
        try {
            expect(condition).toBeTruthy();
            console.log(`✅ ${message}`);
        } catch (error) {
            console.error(`Assertion Failed: ${message}`);
            throw error;
        }
    }

    /**
     * Assert that a condition is false
     * @param {boolean} condition
     * @param {string} message
     */
    static assertFalse(condition, message = "Expected condition to be false") {
        try {
            expect(condition).toBeFalsy();
            console.log(`✅ ${message}`);
        } catch (error) {
            console.error(`Assertion Failed: ${message}`);
            throw error;
        }
    }

    /**
     * Assert two values are equal
     * @param {any} actual
     * @param {any} expected
     * @param {string} message
     */
    static assertEquals(actual, expected, message = "Expected values to be equal") {
        try {
            expect(actual).toBe(expected);
            console.log(`✅ ${message}`);
        } catch (error) {
            console.error(`Assertion Failed: ${message}. Expected: ${expected}, but got: ${actual}`);
            throw error;
        }
    }

    /**
     * Assert two values are not equal
     * @param {any} actual
     * @param {any} expected
     * @param {string} message
     */
    static assertNotEquals(actual, expected, message = "Expected values to be different") {
        try {
            expect(actual).not.toBe(expected);
            console.log(`${message}`);
        } catch (error) {
            console.error(`Assertion Failed: ${message}. Values should not be: ${actual}`);
            throw error;
        }
    }

    /**
     * Assert that a value is defined (not null or undefined)
     * @param {any} value
     * @param {string} message
     */
    static assertDefined(value, message = "Expected value to be defined") {
        try {
            expect(value).not.toBeNull();
            expect(value).not.toBeUndefined();
            console.log(`${message}`);
        } catch (error) {
            console.error(`Assertion Failed: ${message}`);
            throw error;
        }
    }

    /**
     * Assert that a value is undefined
     * @param {any} value
     * @param {string} message
     */
    static assertUndefined(value, message = "Expected value to be undefined") {
        try {
            expect(value).toBeUndefined();
            console.log(`${message}`);
        } catch (error) {
            console.error(`Assertion Failed: ${message}. Got: ${value}`);
            throw error;
        }
    }

    /**
     * Assert that an array contains an expected item
     * @param {Array} array
     * @param {any} item
     * @param {string} message
     */
    static assertArrayContains(array, item, message = "Expected array to contain item") {
        try {
            expect(array).toContain(item);
            console.log(`${message}`);
        } catch (error) {
            console.error(`Assertion Failed: ${message}. Array: ${JSON.stringify(array)}, Missing: ${item}`);
            throw error;
        }
    }

    /**
     * Assert that an array does not contain an item
     * @param {Array} array
     * @param {any} item
     * @param {string} message
     */
    static assertArrayNotContains(array, item, message = "Expected array to not contain item") {
        try {
            expect(array).not.toContain(item);
            console.log(`${message}`);
        } catch (error) {
            console.error(`Assertion Failed: ${message}. Array contains: ${item}`);
            throw error;
        }
    }

    /**
     * Assert that a string matches a given regex pattern
     * @param {string} text
     * @param {RegExp} pattern
     * @param {string} message
     */
    static assertMatchesRegex(text, pattern, message = "Expected text to match pattern") {
        try {
            expect(text).toMatch(pattern);
            console.log(`${message}`);
        } catch (error) {
            console.error(`Assertion Failed: ${message}. Text: "${text}", Pattern: ${pattern}`);
            throw error;
        }
    }
}

module.exports = GlobalAssertions;
