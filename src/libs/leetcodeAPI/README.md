# Leetcode API Library
[Leetcode Roulette](https://leetcoderoulette.com) library to get [Leetcode](https://leetcode.com) question data from the [Leetcode APIs](https://leetcode.com/api/problems/all).

## Example

### note: CommonJS usage
In order to gain the TypeScript typings (for intellisense / autocomplete) while using CommonJS imports with `require()` use the following approach:

```js
const LeetcodeAPI = require('leetcode-api');

// LeetcodeAPI.<method> will now provide autocomplete and parameter typings
```

Creating a new Leetcode API object and getting question data

```js
const leetcodeAPI = new LeetcodeAPI();
const questions = await leetcodeAPI.getQuestionData(); // Returns array of all leetcode questions in their API
```

### LeetcodeAPI API
A LeetcodeAPI object can be made by passing in an optional config of the type LeetcodeAPIConfig to `LeetcodeAPI`.

##### LeetcodeAPI(config?)

```js
// Create a new LeetcodeAPI object.
new LeetcodeAPI(config);
```

### Instance methods
The available instance methods are listed below.

##### leetcodeAPI.getQuestionData()

## TypeScript

LeetcodeAPI includes [TypeScript](https://typescriptlang.org) definitions and a type guard for LeetcodeAPI errors.

```typescript
const leetcodeAPI: LeetcodeAPI = new LeetcodeAPI();
const questions: Array<QuestionData> = leetcodeAPI.getQuestionData(); // Returns an array of leetcode questions
```

### Testing
To test the project, run the `npm run test` command.

```
npm run test
```

This will run the tests in any file in the `src` directory following the specified formats.

* `"**/tests/**/*.spec.ts"`
* `"**/tests/**/*.test.ts"`

## Built With
* [NodeJS](https://nodejs.org) - Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser.
* [Typescript](https://typescriptlang.org) - TypeScript is a free and open source programming language developed and maintained by Microsoft.

## Author

👤 **Eric Hicks**

## 📝 License

Copyright © 2022 [Leetcode Roulette](https://github.com/leetcode-roulette).<br />
This project is [MIT](https://github.com/leetcode-roulette/backend-services/blob/master/LICENSE) licensed.

---