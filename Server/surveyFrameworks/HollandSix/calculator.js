export function RIASEC_Calculator(data) {
  const rAttributes = [1, 7, 14, 22, 30, 32, 37];
  const iAttributes = [2, 11, 18, 21, 26, 33, 39];
  const aAttributes = [3, 8, 17, 23, 27, 31, 41];
  const sAttributes = [4, 12, 13, 20, 28, 34, 40];
  const eAttributes = [5, 10, 16, 19, 29, 36, 42];
  const cAttributes = [6, 9, 15, 24, 25, 35, 38];

  let scores = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  };

  // Calculate scores
  for (const attribute in data.Hollan6_Result) {
    const attrIndex = parseInt(attribute);
    if (data.Hollan6_Result[attribute].like === 1) {
      if (rAttributes.includes(attrIndex)) scores.R++;
      else if (iAttributes.includes(attrIndex)) scores.I++;
      else if (aAttributes.includes(attrIndex)) scores.A++;
      else if (sAttributes.includes(attrIndex)) scores.S++;
      else if (eAttributes.includes(attrIndex)) scores.E++;
      else if (cAttributes.includes(attrIndex)) scores.C++;
    }
  }

  // Sort scores to find the top 3
  const sortedScores = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const topThreeKeys = sortedScores.map(([key]) => key);
  const highestCombination = topThreeKeys.join("");

  // Create output
  const output = {
    highest: topThreeKeys[0],
    highestCombination: highestCombination,
    result: scores,
  };

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
