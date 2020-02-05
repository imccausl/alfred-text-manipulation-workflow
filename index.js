const alfy = require("alfy");

function formatList(data, joinWith = ",", wrapper = "", prefix = "") {
    const arrayFromData = removeDuplicates(data);

    return arrayFromData
        .filter(item => item.trim() !== "")
        .map(item => `${wrapper}${prefix}${item.trim()}${wrapper}`)
        .join(joinWith);
}

function formatGql(server, data) {
    const prefix = `production:${server.toLowerCase()}-`;

    return formatList(data, ",", '\\"', prefix);
}

function removeDuplicates(data) {
    return Array.from(new Set(data.split("\n")));
}

const SERVER_CODES = ["us", "ca"];
const cleanedInput = alfy.input
    .replace(/production:us-/g, "")
    .replace(/production:ca-/g, "");

const commaSeparatedOutput = formatList(cleanedInput);
const commaSeparatedInSingleQuotes = formatList(cleanedInput, ",", "'");
const filterForRemoval = formatList(cleanedInput, "\n");
const [usServerGql, caServerGql] = SERVER_CODES.map(server =>
    formatGql(server, cleanedInput)
);

const list = [
    {
        title: "Inventory IDs Formatted for Removal",
        subtitle: filterForRemoval,
        text: {
            copy: filterForRemoval,
            largetype: filterForRemoval
        }
    },
    {
        title: "Unmodified Comma-Separated Output",
        subtitle: commaSeparatedOutput,
        text: {
            copy: commaSeparatedOutput,
            largetype: commaSeparatedOutput
        }
    },
    {
        title: "Comma-Separated Output in Single Quotes",
        subtitle: commaSeparatedInSingleQuotes,
        text: {
            copy: commaSeparatedInSingleQuotes,
            largetype: commaSeparatedInSingleQuotes
        }
    },
    {
        title: "Graph QL US Server Output (Comma-Separated)",
        subtitle: usServerGql,
        text: {
            copy: usServerGql,
            largetype: usServerGql
        }
    },
    {
        title: "Graph QL CA Server Output (Comma-Separated)",
        subtitle: caServerGql,
        text: {
            copy: caServerGql,
            largetype: caServerGql
        }
    }
];

alfy.output(list);
