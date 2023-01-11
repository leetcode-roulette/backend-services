# Leetcode GraphQL Library
[Leetcode Roulette](https://leetcoderoulette.com) library to get [Leetcode](https://leetcode.com) data from [Leetcode's GraphQL](https://leetcode.com/graphql).

## Example

### note: CommonJS usage
In order to gain the TypeScript typings (for intellisense / autocomplete) while using CommonJS imports with `require()` use the following approach:

```js
const getLeetcodeGraphQL = require('common/leetcode/graphql');

// getLeetcodeGraphQL() will now provide autocomplete and parameter typings
```

Getting question data from Leetcode GraphQL

```js
const query = `query {
  problemsetQuestionList: questionList(categorySlug: "", filters: {}, limit: 100000) {
    data {
      questionId
      questionFrontendId
      title
      content
      difficulty
      titleSlug
      isPaidOnly
      hints
      tags: topicTags {
          name
      }
    }
  }
}`;
const data = await getLeetcodeGraphQL(query); // Returns Axios response data consisting of Leetcode question data.
```
## TypeScript

leetcode-graphql includes [TypeScript](https://typescriptlang.org) definitions and a type guard for LeetcodeAPI errors.

```typescript
const data: AxiosResponse = await getLeetcodeGraphQL(query);
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
