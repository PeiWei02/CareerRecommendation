export function RIASEC_Calculator(data) {
  const rAttributes = [1, 7, 14, 22, 30, 32, 37];
  const iAttributes = [2, 11, 18, 21, 26, 33, 39];
  const aAttributes = [3, 8, 17, 23, 27, 31, 41];
  const sAttributes = [4, 12, 13, 20, 28, 34, 40];
  const eAttributes = [5, 10, 16, 19, 29, 36, 42];
  const cAttributes = [6, 9, 15, 24, 25, 35, 38];

  let rScore = 0;
  let iScore = 0;
  let aScore = 0;
  let sScore = 0;
  let eScore = 0;
  let cScore = 0;

  for (const attribute in data.Hollan6_Result) {
    if (rAttributes.includes(parseInt(attribute))) {
      if (data.Hollan6_Result[attribute].like === 1) {
        rScore++;
        continue;
      }
    } else if (iAttributes.includes(parseInt(attribute))) {
      if (data.Hollan6_Result[attribute].like === 1) {
        iScore++;
        continue;
      }
    } else if (aAttributes.includes(parseInt(attribute))) {
      if (data.Hollan6_Result[attribute].like === 1) {
        aScore++;
        continue;
      }
    } else if (sAttributes.includes(parseInt(attribute))) {
      if (data.Hollan6_Result[attribute].like === 1) {
        sScore++;
        continue;
      }
    } else if (eAttributes.includes(parseInt(attribute))) {
      if (data.Hollan6_Result[attribute].like === 1) {
        eScore++;
        continue;
      }
    } else if (cAttributes.includes(parseInt(attribute))) {
      if (data.Hollan6_Result[attribute].like === 1) {
        cScore++;
        continue;
      }
    }
  }

  const scores = {
    R: rScore,
    I: iScore,
    A: aScore,
    S: sScore,
    E: eScore,
    C: cScore,
  };

  const highestScore = Math.max(...Object.values(scores));
  const highestType = Object.keys(scores).find(
    (key) => scores[key] === highestScore
  );

  const output = {
    highest: highestType,
    result: scores,
  };

  // const jsonOutput = JSON.stringify(output);
  // return jsonOutput;
  return output;
}

const json = {
  Hollan6_Result: {
    1: {
      like: 1,
    },
    2: {
      like: 0,
    },
    3: {
      like: 1,
    },
    4: {
      like: 0,
    },
    5: {
      like: 1,
    },
    6: {
      like: 0,
    },
    7: {
      like: 1,
    },
    8: {
      like: 0,
    },
    9: {
      like: 1,
    },
    10: {
      like: 0,
    },
    11: {
      like: 1,
    },
    12: {
      like: 0,
    },
    13: {
      like: 1,
    },
    14: {
      like: 1,
    },
    15: {
      like: 1,
    },
    16: {
      like: 0,
    },
    17: {
      like: 1,
    },
    18: {
      like: 0,
    },
    19: {
      like: 1,
    },
    20: {
      like: 0,
    },
    21: {
      like: 1,
    },
    22: {
      like: 1,
    },
    23: {
      like: 1,
    },
    24: {
      like: 0,
    },
    25: {
      like: 1,
    },
    26: {
      like: 0,
    },
    27: {
      like: 1,
    },
    28: {
      like: 0,
    },
    29: {
      like: 1,
    },
    30: {
      like: 1,
    },
    31: {
      like: 1,
    },
    32: {
      like: 0,
    },
    33: {
      like: 1,
    },
    34: {
      like: 0,
    },
    35: {
      like: 1,
    },
    36: {
      like: 1,
    },
    37: {
      like: 0,
    },
    38: {
      like: 0,
    },
    39: {
      like: 1,
    },
    40: {
      like: 0,
    },
    41: {
      like: 0,
    },
    42: {
      like: 1,
    },
  },
};

// const result = RIASEC_Calculator(json);
// console.log(result);
