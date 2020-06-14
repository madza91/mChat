/**
 * Renders a html Table
 * @param data
 * @returns {string}
 */
module.exports = (data) => {
  let templateRows = '';

  for (let [key, value] of Object.entries(data)) {
    if (value) {
      templateRows += `<tr><td>${ key }</td><td>${ value }</td></tr>`
    }
  }

  return `<table>${ templateRows }</table>`
};
