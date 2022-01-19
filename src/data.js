const letterGrades = [
  { letter: 'A+', from: 96.5, to: Infinity },
  { letter: 'A', from: 92.5, to: 96.5 },
  { letter: 'A-', from: 89.5, to: 92.5 },
  { letter: 'B+', from: 86.5, to: 89.5 },
  { letter: 'B', from: 82.5, to: 86.5 },
  { letter: 'B-', from: 79.5, to: 82.5 },
  { letter: 'C+', from: 76.5, to: 79.5 },
  { letter: 'C', from: 72.5, to: 76.5 },
  { letter: 'C-', from: 69.5, to: 72.5 },
  { letter: 'D+', from: 66.5, to: 69.5 },
  { letter: 'D', from: 64.5, to: 66.5 },
  { letter: 'F', from: -Infinity, to: 64.5 },
]

const letterFor = grade => {
  for (const x of letterGrades)
    if (grade >= x.from)
      return x.letter
}

export const analysis = mpGrades => {
  const avg = mpGrades.reduce((total, grade) => total + grade, 0) / mpGrades.length
  const results = []
  let exam = 100
  while (exam >= 0) {
    const final = 0.9 * avg + 0.1 * exam
    const letter = letterFor(final)
    const result = { letter, max: exam }
    while (exam > 0 && letterFor(0.9 * avg + 0.1 * (exam - 1)) === letter) exam--
    result['min'] = exam
    results.push(result)
    exam--
  }
  return {
    noFinal: {
      avg: Math.round(avg),
      letter: letterFor(avg)
    },
    possibilities: results
  }
}