const path = require("path");
const process = require("process");
const {
  jsxAttribute,
  jsxIdentifier,
  stringLiteral,
} = require("@babel/types/lib/builders/generated");

const isExclude = (filePath) => pathMatch(filePath, ["node_modules/"]);
const pathMatch = (filePath, matches) => {
  if (!matches?.length) return false;

  return matches.some((match) => {
    if (typeof match === "string") {
      return filePath.includes(match);
    } else if (match instanceof RegExp) {
      return match.test(filePath);
    }
    // default is do not filter when match is illegal, so return true
    return true;
  });
};

const isNil = (value) => value === null || value === undefined;

const doJSXOpeningElement = (node, option) => {
  const { stop } = doJSXPathName(node.name);
  if (stop) return { stop };
  const { relativePath, filePath } = option;
  const line = node.loc?.start.line;
  const column = node.loc?.start.column;
  const lineAttr = isNil(line)
    ? null
    : jsxAttribute(
        jsxIdentifier("data-inspector-line"),
        stringLiteral(line.toString())
      );

  const columnAttr = isNil(column)
    ? null
    : jsxAttribute(
        jsxIdentifier("data-inspector-column"),
        stringLiteral(column.toString())
      );

  const relativePathAttr = jsxAttribute(
    jsxIdentifier("data-inspector-relative-path"),
    stringLiteral(filePath)
  );

  const attributes = [lineAttr, columnAttr, relativePathAttr];
  if (attributes.every(Boolean)) {
    node.attributes.unshift(...attributes);
  }
  return { result: node };

  // console.log(relativePath, line, column, '>>>>>>>>>>>>>');
};

const pathRelative = (filePath) => path.relative(process.cwd(), filePath);

const doJSXIdentifierName = (name) => {
  if (name.name.endsWith("Fragment")) {
    return { stop: true };
  }
  return { stop: false };
};
const doJSXMemberExpressionName = (name) => {
  const { stop } = doJSXIdentifierName(name.property);
  return { stop };
};

const doJSXNamespacedNameName = (name) => {
  const { stop } = doJSXIdentifierName(name.name);
  return { stop };
};

const doJSXPathName = (name) => {
  const visitors = {
    JSXIdentifier: doJSXIdentifierName,
    JSXMemberExpression: doJSXMemberExpressionName,
    JSXNamespacedName: doJSXNamespacedNameName,
  };

  return visitors[name.type](name);
};

function a(...args) {
  // console.log(args, '????');
  return {
    visitor: {
      JSXOpeningElement: {
        enter(path, state) {
          const filePath = state?.file?.opts?.filename;
          if (!filePath) return;
          if (isExclude(filePath)) return;

          const relativePath = pathRelative(filePath);
          console.log(relativePath, "relativePath");
          doJSXOpeningElement(path.node, {
            relativePath,
            filePath,
          });
        },
      },
    },
  };
}

module.exports = a;
