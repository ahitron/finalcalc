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
    haveValidGrades ? null : (
      <div className="card mb-1 border-danger" id="waitingCard">
        <div className="card-body">
          <h5 className="card-title text-center">Waiting for all marking period grades to be entered...</h5>
        </div>
      </div>
    )

  console.log(data)
  return (
    <div className="container mt-3" style={{ 'maxWidth': '550px' }}>
      {renderOptions()}
      <hr />
      <h5 className="text-center mb-3">Enter marking period grades</h5>
      {renderInputs()}
      {renderWaitingCard()}
      <div className="card mb-1" id="avgCard">
        <div className="card-body">
          <h5 className="card-title text-center">Average with no final exam</h5>
          <div className="card-text">
            <h3 id="avg" className="text-center"></h3>
          </div>
        </div>
      </div>
      <div className="card mb-1" id="avg0Card">
        <div className="card-body">
          <h5 className="card-title text-center">Average with 0% on final exam</h5>
          <div className="card-text">
            <h3 id="avg0" className="text-center"></h3>
            <p className="text-center">Completing the final exam <b id="effect0"></b> lower your letter grade.</p>
          </div>
        </div>
      </div>
      <div className="card mb-1" id="avg100Card">
        <div className="card-body">
          <h5 className="card-title text-center">Average with 100% on final exam</h5>
          <div className="card-text">
            <h3 id="avg100" className="text-center"></h3>
            <p className="text-center">Completing the final exam <b id="effect100"></b> raise your letter grade.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
