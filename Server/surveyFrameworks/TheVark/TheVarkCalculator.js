export function TheVarkCalculator(answers) {
    const varkScoringChart = {
        1: { A: 'A', B: 'R', C: 'R', D: 'V' },
        2: { A: 'V', B: 'A', C: 'R', D: 'K' },
        3: { A: 'K', B: 'V', C: 'R', D: 'A' },
        4: { A: 'K', B: 'A', C: 'V', D: 'R' },
        5: { A: 'A', B: 'V', C: 'K', D: 'R' },
        6: { A: 'K', B: 'R', C: 'V', D: 'A' },
        7: { A: 'K', B: 'A', C: 'V', D: 'R' },
        8: { A: 'R', B: 'K', C: 'A', D: 'V' },
        9: { A: 'R', B: 'A', C: 'K', D: 'V' },
        10: { A: 'K', B: 'V', C: 'R', D: 'A' },
        11: { A: 'V', B: 'R', C: 'A', D: 'K' },
        12: { A: 'A', B: 'R', C: 'V', D: 'K' },
        13: { A: 'K', B: 'A', C: 'R', D: 'V' },
        14: { A: 'K', B: 'R', C: 'A', D: 'V' },
        15: { A: 'K', B: 'A', C: 'R', D: 'V' },
        16: { A: 'V', B: 'A', C: 'R', D: 'K' }
    };

    let scores = { V: 0, A: 0, R: 0, K: 0 };

    Object.keys(answers).forEach((questionIndex) => {
        const answerList = answers[questionIndex]; 
        const questionNumber = parseInt(questionIndex) + 1; 

        answerList.forEach((answer) => {
            const category = varkScoringChart[questionNumber][answer];
            scores[category]++;
        });
    });

    const highestScore = Math.max(...Object.values(scores));
    const highestType = Object.keys(scores).find((key) => scores[key] === highestScore);

    return {
        highest: highestType,
        result: scores,
    };
}

