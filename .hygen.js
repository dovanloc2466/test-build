const changeCase = require("change-case");
const pluralize = require("pluralize");

const helpers = {
  getFolderName: (folderName) => changeCase.paramCase(folderName),
  getModuleName: (moduleName) => changeCase.pascalCase(moduleName),
  getLayoutName: (layoutName) => changeCase.pascalCase(`${layoutName}Layout`),
  getViewName: (layoutName) => changeCase.pascalCase(`${layoutName}View`),
  getPageName: (pageName) => changeCase.camelCase(pageName),
  getPageFullname: (pageName) => "Page" + changeCase.pascalCase(pageName),
  getPagePath: (pagePath) =>
    pagePath.startsWith("/") ? pagePath : "/" + pagePath,
  getTableViewName: (origin) => changeCase.pascalCase(origin + "TableView"),

  // #region [DetailView]
  getDetailViewName: (origin) => changeCase.pascalCase(origin + "View"),
  getDetailViewFilePath: (moduleName, pageName, modelName) => `src/${helpers.getFolderName(moduleName)}/pages/${helpers.getFolderName(pageName)}/views/${helpers.getDetailViewName(modelName)}.tsx`,
  getDetailViewDirPath: (moduleName, pageName, modelName) => `src/${helpers.getFolderName(moduleName)}/pages/${helpers.getFolderName(pageName)}/views/${helpers.getFolderName(helpers.getDetailViewName(modelName))}`,
  // #endregion

  getTableName: (origin) => changeCase.pascalCase(origin + "Table"),
  getFormName: (formName) =>
    formName.toLowerCase().endsWith("form")
      ? changeCase.pascalCase(formName)
      : changeCase.pascalCase(`${formName}Form`),
  getFormControlName: (formName) =>
    formName.toLowerCase().endsWith("form")
      ? changeCase.pascalCase(`${formName}Control`)
      : changeCase.pascalCase(`${formName}FormControl`),
  pluralize: pluralize,
  getModelName: (origin) => changeCase.pascalCase(origin)
}

module.exports = {
  helpers: helpers
};
