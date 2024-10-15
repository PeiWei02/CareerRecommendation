export function MBTICalculator(answers) {
    const score = {
        EI: { A: 0, B: 0 },
        SN: { A: 0, B: 0 },
        TF: { A: 0, B: 0 },
        JP: { A: 0, B: 0 }
    };

    const mbtiMapping = {
        1: 'EI', 2: 'SN', 3: 'SN', 4: 'TF', 5: 'TF', 6: 'JP', 7: 'JP',
        8: 'EI', 9: 'SN', 10: 'SN', 11: 'TF', 12: 'TF', 13: 'JP', 14: 'JP',
        15: 'EI', 16: 'SN', 17: 'SN', 18: 'TF', 19: 'TF', 20: 'JP', 21: 'JP',
        22: 'EI', 23: 'SN', 24: 'SN', 25: 'TF', 26: 'TF', 27: 'JP', 28: 'JP',
        29: 'EI', 30: 'SN', 31: 'SN', 32: 'TF', 33: 'TF', 34: 'JP', 35: 'JP',
        36: 'EI', 37: 'SN', 38: 'SN', 39: 'TF', 40: 'TF', 41: 'JP', 42: 'JP',
        43: 'EI', 44: 'SN', 45: 'SN', 46: 'TF', 47: 'TF', 48: 'JP', 49: 'JP',
        50: 'EI', 51: 'SN', 52: 'SN', 53: 'TF', 54: 'TF', 55: 'JP', 56: 'JP',
        57: 'EI', 58: 'SN', 59: 'SN', 60: 'TF', 61: 'TF', 62: 'JP', 63: 'JP',
        64: 'EI', 65: 'SN', 66: 'SN', 67: 'TF', 68: 'TF', 69: 'JP', 70: 'JP'
    };

    Object.keys(answers).forEach((questionId) => {
        const category = mbtiMapping[questionId];
        const answer = answers[questionId];
        
        if (category && answer) {
          score[category][answer]++;
        }
    });

    const mbtiType = {
        EI: score.EI.A > score.EI.B ? 'E' : 'I',
        SN: score.SN.A > score.SN.B ? 'S' : 'N',
        TF: score.TF.A > score.TF.B ? 'T' : 'F',
        JP: score.JP.A > score.JP.B ? 'J' : 'P'
    };

    const scores = {
        EI: { E: score.EI.A, I: score.EI.B },
        SN: { S: score.SN.A, N: score.SN.B },
        TF: { T: score.TF.A, F: score.TF.B },
        JP: { J: score.JP.A, P: score.JP.B }
    };

    const highestType = `${mbtiType.EI}${mbtiType.SN}${mbtiType.TF}${mbtiType.JP}`;
    
    return {
        highest: highestType,  
        result: scores       
    };
}
