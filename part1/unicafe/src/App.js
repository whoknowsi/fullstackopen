import { useState } from 'react'

const Button = ({handleButton, text}) => (
  <button onClick={handleButton}>{text}</button>
)

const StatisticsLine = ({ text, value }) => (
  <tbody>
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  </tbody>
)


const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad;
  let avg = good/all - bad/all;
  let pct = good/all*100 + ' %'

  return (
  <>
    <h1>statistics</h1>
    {all > 0 ? (
      <table>
        <StatisticsLine text={'good'} value={good} />
        <StatisticsLine text={'neutral'} value={neutral} />
        <StatisticsLine text={'bad'} value={bad} />
        <StatisticsLine text={'all'} value={all} />
        <StatisticsLine text={'average'} value={avg} />
        <StatisticsLine text={'positive'} value={pct} />
      </table>
    ) : (
      <p>No feedback given</p>
    )}
  </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleButton={() => setGood(good+1)} text={'good'} />
      <Button handleButton={() => setNeutral(neutral+1)} text={'neutral'} />
      <Button handleButton={() => setBad(bad+1)} text={'bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
