import './App.css';

import { useEffect, useState } from 'react';


function App() {
  const [operations, setOperatons] = useState([])
  const [textField, setTextField] = useState("")


  // useEffect(() => {

  //   const receiveUpdate = (update) => {
  //     console.log('receiving update', update)
  //     setOperatons([...operations, update.payload])
  //   }
  //   if (window.webxdc) {
  //     window.webxdc.setUpdateListener(receiveUpdate, 0);
  //   }

  //   return () => {
  //   }
  // }, [operations, setOperatons])

  const sendUpdate = () => {
    if (window.webxdc) { window.webxdc.sendUpdate({ payload: textField }) }
  }

  return (
    <div className="App">
      <header className="App-header">
        {textField}<br />
        <input value={textField} onInput={e => setTextField(e.target.value)} />
        <button onClick={sendUpdate}>Submit</button><br />
        <div>
          <h2>Operations</h2>
          {operations.map(function (operation, i) {
            return <div key={i}>
              {operation}
            </div>;
          })}
        </div>
        <div>
          <h3>{window.webxdc ? 'window.webxdc' : 'no webxdc'}</h3>
        </div>
      </header>
    </div>
  );
}

export default App;
