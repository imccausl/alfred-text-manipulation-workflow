const alfy = require("alfy");
const parse = require("csv-parse/lib/sync");

function convertToAlfredOutput(obj) {
  const items = [];

  Object.keys(obj).forEach(key => {
    const column = obj[key].join("\n");

    items.push({
      title: `List of items in column '${key}'`,
      subtitle: `${obj[key].length} items in list: ${column}`,
      arg: column,
      text: {
        copy: column,
        largetype: column
      }
    });
  });

  return items;
}

const csv_config = {
  delimiter: "\t",
  trim: true,
  columns: true
};

const records = parse(alfy.input, csv_config);
const columnLists = records.reduce((obj, record) => {
  Object.keys(record).forEach(key => {
    if (!obj[key]) {
      obj[key] = [record[key]];
    } else {
      obj[key].push(record[key]);
    }
  });

  return obj;
}, {});

alfy.output(convertToAlfredOutput(columnLists));
