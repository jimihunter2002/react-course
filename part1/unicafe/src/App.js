import React, { useState } from 'react';

const styles = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: 'green',
  width: '40%',
  height: 40,
};

const Button = ({ onClickHandle, text, id }) => {
  return (
    <div id={id}>
      <button onClick={onClickHandle}>{text}</button>
    </div>
  );
};

const StatisticLine = props => {
  return (
    <p>
      {props.text}
      {props.value}
    </p>
  );
};

const Statistics = props => {
  const { good, bad, neutral, allStats } = props;
  const feedbackPercent = (good / allStats.length) * 100 + ' %';

  return (
    <div>
      <h2>statistics</h2>
      {allStats.length === 0 ? (
        <p>No feedback given</p>
      ) : (
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <StatisticLine text='good' />
                </td>
                <td>
                  <StatisticLine value={good} />
                </td>
              </tr>
              <tr>
                <td>
                  <StatisticLine text='neutral' />
                </td>
                <td>
                  <StatisticLine value={neutral} />
                </td>
              </tr>
              <tr>
                <td>
                  <StatisticLine text='bad' />
                </td>
                <td>
                  <StatisticLine value={bad} />
                </td>
              </tr>
              <tr>
                <td>
                  <StatisticLine text='all' />
                </td>
                <td>
                  <StatisticLine value={allStats.length} />
                </td>
              </tr>
              <tr>
                <td>
                  <StatisticLine text='average' />
                </td>
                <td>
                  <StatisticLine value={allStats.length / 3} />
                </td>
              </tr>
              <tr>
                <td>
                  <StatisticLine text='positive' />
                </td>
                <td>
                  <StatisticLine value={feedbackPercent} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allStats, setAllStats] = useState([]);

  const goodHandler = () => {
    setAllStats(allStats.concat('G'));
    setGood(good + 1);
  };

  const neutralHandler = () => {
    setAllStats(allStats.concat('N'));
    setNeutral(neutral + 1);
  };

  const badHandler = () => {
    setAllStats(allStats.concat('B'));
    setBad(bad + 1);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button
        onClickHandle={goodHandler}
        text='good'
        id='good-btn'
        style={{ styles }}
      />
      <Button
        onClickHandle={neutralHandler}
        text='neutral'
        id='neutral-id'
        style={{ styles }}
      />
      <Button
        onClickHandle={badHandler}
        text='bad'
        id='bad-id'
        style={{ styles }}
      />
      <br />
      <Statistics good={good} bad={bad} neutral={neutral} allStats={allStats} />
    </div>
  );
};

export default App;
