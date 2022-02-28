import React, {useState} from 'react'
import './Quiz.css'

export default function Quiz(props) {

    // const [questions, setQuestions] = useState([])
    const [quiz, setQuiz] = useState(props.quizData)
    const [score, setScore] = useState(0)
    const [answered, setAnswered] = useState(false)

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        console.log(event)
        console.log(`${name} ${value} ${type} ${checked}`)
        setQuiz(prevQuiz => {
            let newQuizData = []
            for(let i = 0; i < prevQuiz.length; i++){
                //console.log(prevQuiz.length)
                if(prevQuiz[i].id === name){
                    //console.log('inside the if '+name)
                    let selectedAns = ''
                    //console.log(prevQuiz[i].options.length)
                    for(let j = 0; j < prevQuiz[i].options.length; j++){
                        const option = prevQuiz[i].options[j]
                        if(option === value){
                            //console.log('yoyoyoyo'+option.value)
                            selectedAns = option
                        } 
                    } 
                    //console.log(options)
                    newQuizData.push({
                        ...prevQuiz[i],
                        selectedAns: selectedAns
                    })
                } else {
                    newQuizData.push({
                        ...prevQuiz[i]
                    })
                }
            }
            console.log(newQuizData)
            return newQuizData
        })
    }

    function checkAnswers(){
        let score = 0
        for(let i = 0; i < quiz.length; i++){
            const question = quiz[i]
            if(question.selectedAns === question.correctAns){
                score += 1
            }
        }
        setAnswered(true)
        setScore(score)
    }


    function styleOptions(quiz) {
        const array = quiz.options
        const option = array.map(option => {

            const styles = {
                backgroundColor: quiz.selectedAns === option ? '#D6DBF5' : '#F5F7FB'
            }

            const ans_styles = {
                backgroundColor: quiz.selectedAns === quiz.correctAns ? '#94d7a2' : '#f7b2b5',
                disabled : true
            }

            // function styless() {
            //     if (answered && quiz.selectedAns === option){
            //         console.log('option1')
            //         return ({backgroundColor: quiz.selectedAns === option ? '#D6DBF5' : '#F5F7FB'})
            //     } else if (answered) {
            //         console.log('option2')
            //         return ({backgroundColor: quiz.selectedAns === quiz.correctAns ? '#94d7a2' : '#f7b2b5'})
            //     } else if (quiz.selectedAns !== quiz.correctAns){
            //         console.log('option3')
            //         return ({backgroundColor: '#f7b2b5'})
            //     }
            // }

            const wrong_ans_styles = {backgroundColor: '#94d7a2'}

            return(
            <div className="quiz-option">
                <input 
                    type="radio" 
                    id={option} 
                    name={quiz.id} 
                    value={option} 
                    onChange={handleChange}
                    checked={quiz.selectedAns === option}
                    disabled = {answered ? true : false}
                />
                <label htmlFor={option}
                //style={answered && quiz.selectedAns === option ? ans_styles : styles}
                style={answered && quiz.selectedAns === option ? ans_styles : quiz.correctAns === option && answered ? wrong_ans_styles  : styles}
                //style={{styless}}
                >{option}</label>
            </div>)
    })
        return option
    }


    const question = quiz.map(quiz => {
        return(
            <div>
                <h2 key={quiz.id} className="quiz-heading">{quiz.question}</h2>

                <div className='quiz-options'>{styleOptions(quiz)}</div>
                <p className="quiz-seperator"></p>
            </div>
        )
    })


    return (
        <div className="quiz-body">
            {/* <h1>Questions</h1> */}
            {question}
            {!answered && <button onClick={checkAnswers} className='playagain-button'>Check answers</button>}
            {answered && 
            <div className="quiz-message-container">
                <p className='quiz-score-message'>Your score is {score}/{quiz.length}</p>
                <button onClick={props.changeMain} className='playagain-button'>Play again</button>
            </div>
            }
            
        </div>
    )
}
