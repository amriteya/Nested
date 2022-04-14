// https://stackoverflow.com/questions/64227680/how-to-replace-a-d3js-nest-function-with-group-and-rollup

const input = [{
    name: "Anton",
    year: "1990"
  },
  {
    name: "Anton",
    year: "1990"
  },
  {
    name: "Anton",
    year: "1971"
  },
  {
    name: "Markus",
    year: "1981"
  },
]

const expected = [
  {
    key: "Anton",
    values: [
      {
        key: "1990",
        value: 2
      },
      {
        key: "1971",
        value: 1
      }
    ],
  },
  {
    key: "Markus",
    values: [
      {
        key: "1981",
        value: 1,
      }
    ],
  },
];

// For ease of use, start with an object, we map key to values
// and unpack it later. The structure we go for now:
// { name: { year: count }}
const nameYearsCount = input.reduce((obj, {
  name,
  year
}) => {
  if (!(name in obj)) {
    obj[name] = {
      [year]: 1
    };
  } else {

    // I.e. if the year doesn't exist, default to zero
    obj[name][year] = (obj[name][year] || 0) + 1
  }
  return obj;
}, {});

// Now transform it into the desired format
const result = Object.entries(nameYearsCount)
  .map(([name, yearsCount]) => {
    const children = Object.entries(yearsCount)
      .map(([year, count]) => ({
        key: year,
        value: count
      }));
    return {
      key: name,
      children
    };
  });

console.log(result);