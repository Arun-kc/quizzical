import './App.css';
import top_blob from './assets/top_blob.png'
import bottom_blob from './assets/bottom_blob.png'
import Main from './components/main/Main';
import React, {useState, useEffect} from 'react';
import Quiz from './components/quiz/Quiz';
import {decode} from 'html-entities';
import { nanoid } from 'nanoid'

function App() {
  const [main, setMain] = useState(true)
  const [quiz, setQuiz] = useState([])
  const [quizData, setQuizData] = useState([])

  useEffect(() => {
    if(main){
      fetch('https://opentdb.com/api.php?amount=5&category=18')
      .then(res => res.json())
      .then(data => setQuiz(data.results))
    }
  }, [main])

  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array
  }

  function getOption(quiz) {
    const options = [quiz.correct_answer, ...quiz.incorrect_answers]
    const newOptions = options.map(option => decode(option))
    return shuffleArray(newOptions)
  }

  function organizeQuizData(){
    for(let i = 0; i < quiz.length; i++){
      const data = quiz[i]
      const reqData = {
        question: decode(data.question),
        options: getOption(data),
        selectedAns: '',
        correctAns: decode(data.correct_answer),
        id: nanoid()
      }
      //console.log(reqData)
      setQuizData(prevQuizData => {
        //console.log(prevQuizData)
        return [...prevQuizData, reqData]
      })

    }
    //console.log(quizData)

  }

  function changeMain (){
    setMain(prevState => !prevState)
    console.log('clicked on start quize button')
    if(main){
      organizeQuizData()
      console.log('inside changeMain')
      console.log(quizData)
    } else {
      setQuizData([])
      setQuiz([])
    }
  }

  return (
    <div className="App">
      <img className="top-blob" src={top_blob} alt="top blob" />
      { main && <Main changeMain={() => changeMain()}/>}
      { !main && 
        <Quiz quizData={quizData}
        changeMain={() => changeMain()}
       />}
      <img className="bottom-blob" src={bottom_blob} alt="bottom blob" />
    </div>
  );
}

export default App;
