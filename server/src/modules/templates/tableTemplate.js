/**
 * Renders a html Table
 * @param data
 * @returns {string}
 */
module.exports = (data) => {
  if (Array.isArray(data)) {
    return renderTable(data.map((row => {
      if (row.v) {
        return renderTableRow(row.k, row.v);
      }
    })));
  }

  let templateRows = [];
  for (let [key, value] of Object.entries(data)) {
    if (value) {
      templateRows.push(renderTableRow(key, value))
    }
  }

  return renderTable(templateRows)
};

renderTableRow = (key, value) => {
  return (
    `<tr>
      <td>${ key }</td>
      <td>${ value }</td>
    </tr>`
  )
}

renderTable = (rows) => {
  return (
    `<table>
        ${ rows.join('') }
    </table>`
  )
}
