const Table = require("cli-table")

const generateView = (tableConstructor, tableContent, tableTitle) => {
  const mainTable = new Table(tableConstructor)

  tableContent.forEach(element => {
    mainTable.push(element)
  });

  console.log(`======== ${tableTitle} ========`);
  console.log(mainTable.toString());
}

module.exports = { generateView }