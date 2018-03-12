import { gt, gte } from "semver";
import filter from "unist-util-filter";
import { parse } from "chast";
import visitChildren from "unist-util-visit-children";


export const format = ast => {
  let categories = {};

  const visitCategories = visitChildren(category => {
    if (!categories[category.text]) {
      categories[category.text] = [];
    }
    let changes = category.children.map(({ text }) => text);

    categories[category.text] = [...categories[category.text], ...changes];
  });

  const visitVersions = visitChildren(visitCategories);

  visitVersions(ast);

  return Object.keys(categories)
    .map(category => {
      return (
        `### ${category}` +
        "\n\n" +
        categories[category].map(change => `* ${change}`).join("\n")
      );
    })
    .join("\n\n");
};
export default (changeLog, { since = "0.0.0", inclusive = false } = {}) => {
  const ast = parse(changeLog);

  return filter(ast, node => {
      const comparison = inclusive ? gte : gt;
    return node.type != "versionEntry" || comparison(node.semver, since);
  });
};
