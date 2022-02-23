import './App.css';
import top_blob from './assets/top_blob.png'
import bottom_blob from './assets/bottom_blob.png'
import Main from './components/main/Main';
import React, {useState} from 'react';
import Quiz from './components/quiz/Quiz';

function App() {
  const [main, setMain] = useState(true)

  function changeMain (){
    setMain(prevState => !prevState)
    console.log('clicked on start quize button')
  }

  return (
    <div className="App">
      <img className="top-blob" src={top_blob} alt="top blob" />
      { main && <Main changeMain={() => changeMain()}/>}
      { !main && <Quiz />}
      <img className="bottom-blob" src={bottom_blob} alt="bottom blob" />
    </div>
  );
}

export default App;
