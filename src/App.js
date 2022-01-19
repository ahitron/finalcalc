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
        <div key={x} className="row mb-1">
          <div className="col-sm form-group mb-2">
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
    console.log(noFinal)
    console.log(possibilities)
    return (
      <>
        <div className="card mb-1">
          <div className="card-body">
            {/* <h5 className="card-title text-center">Average with no final exam</h5> */}
            <div className="card-text">
              If you do not take a final, your grade will be {noFinal.letter}.
            </div>
          </div>
        </div>
        {
          possibilities.map(x => (
            <div key={x.letter} className="card mb-1">
              <div className="card-body">
                <div className="card-text">
                  If you score between {x.min} and {x.max} on the final, your grade will be {x.letter}.
                </div>
              </div>
            </div>
          ))}
      </>
    )
  }

  return (
    <div className="container mt-3" style={{ 'maxWidth': '550px' }}>
      {renderOptions()}
      <hr />
      <h5 className="text-center mb-3">Enter marking period grades</h5>
      {renderInputs()}
      {haveValidGrades ? renderResults() : renderWaitingCard()}
    </div>
  );
}

export default App;
