import getLeetcodeGraphQL from "../src/index";

describe("Leetcode GraphQL Library is able to get responses from `https://leetcode.com/graphql`", () => {
  test("It does not throw an error", () => {
    const query = `query {
      problemsetQuestionList: questionList(categorySlug: "", filters: {}, limit: 100000) {
        data {
          questionId
          questionFrontendId
          title
          content
          difficulty
        }
      }
    }`;

    const callback = async () => {
      try {
        return await getLeetcodeGraphQL(query);
      } catch(e) {
        throw new Error("Test failed with error: " + e);
      }
    }

    expect(callback).not.toThrowError();
  });
});
