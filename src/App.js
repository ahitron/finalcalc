import { useState } from 'react'
import { analysis } from './data'

function App() {
  const [numPeriods, setNumPeriods] = useState(2)
  const [grades, setGrades] = useState(['', '', '', ''])

  const actualGrades = grades.slice(0, numPeriods)
  const haveValidGrades = actualGrades.reduce((soFar, next) => soFar && Number.isFinite(next), true)
  const data = haveValidGrades ? analysis(actualGrades) : null

  const updateGrade = (idx, grade) => {
    const temp = [...grades]
    const num = parseInt(grade)
    if (num > 100) num = 100
    if (num < 0) num = 0
    temp[idx] = Number.isFinite(num) ? num : ''
    setGrades(temp)
  }
  const renderOptions = () => {
    if (numPeriods === 4)
      return <>
        <span onClick={() => setNumPeriods(2)}>Semester</span>
        <span> | </span>
        <b>Full Year</b>
      </>
    else
      return <>
        <b>Semester</b>
        <span> | </span>
        <span onClick={() => setNumPeriods(4)}>Full Year</span>
      </>
  }

  const renderInputs = () =>
    [...Array(numPeriods).keys()]
      .map(x =>
        <div key={x} className="row">
          <div className="col-sm form-group mb-1">
            <input
              type="number"
              className="form-control mp"
              placeholder={`MP${x + 1}`}
              value={grades[x]}
              onChange={e => updateGrade(x, e.target.value)}
            />
          </div>
        </div>
      )

  const renderWaitingCard = () =>
    <div className="card mb-1 border-danger" id="waitingCard">
      <div className="card-body">
        <h5 className="card-title text-center">Waiting for all marking period grades to be entered...</h5>
      </div>
    </div>

  const renderResults = () => {
    const { noFinal, possibilities } = data
    const current = noFinal.letter
    const best = possibilities[0].letter
    const worst = possibilities[possibilities.length - 1].letter
    if (best === worst)
      return (
        <p>Your overall grade for the course is <b>{noFinal.letter}</b>, and that <b>cannot be changed</b> by taking a final exam.</p>
      )
    return (
      <>
        <p>
          If you <b>do not take</b> a final exam, your overall grade for the course will be <b>{noFinal.letter}</b>.
        </p>
        <p>
          If you <b>do take</b> a final exam, your overall grade {best === current ? <span><b>cannot increase</b>, and </span> : null}will range from <b>{worst}</b> to <b>{best}</b>, as determined by your final exam score.
        </p>
        <table className="table text-center table-hover table-sm table-bordered">
          <thead className="table-light">
            <tr>
              <th style={{ 'width': '50%' }}>Final Exam Score</th>
              <th style={{ 'width': '50%' }}>Overall Grade</th>
            </tr>
          </thead>
          <tbody>
            {
              possibilities.map(x => (
                <tr key={x.letter}>
                  <td>
                    {x.min === x.max ? x.min : <span>{x.min}&ndash;{x.max}</span>}
                  </td>
                  <td>
                    {x.letter}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    )
  }

  const renderResultsCard = () => {
    return (
      <>
        <div className="card mb-1">
          <div className="card-body">
            <div className="card-text">
              {renderResults()}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="container mt-3" style={{ 'maxWidth': '550px' }}>
      {renderOptions()}
      <hr />
      <h6 className="text-center mb-3">Enter your marking period grades</h6>
      {renderInputs()}
      <h6 className="text-center mb-3 mt-3">Results</h6>
      {haveValidGrades ? renderResultsCard() : renderWaitingCard()}
    </div>
  )
}

export default App
