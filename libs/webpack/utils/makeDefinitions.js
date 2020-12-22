module.exports = (definitionValues) => {
  return Object.keys(definitionValues).reduce(
    (definitionObj, key) => Object.assign(definitionObj, { [key]: JSON.stringify(definitionValues[key]) }), {})
}