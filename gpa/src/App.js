import React, { useState } from 'react';
import { Input } from 'reactstrap'
import Fade from 'react-reveal/Fade';
import { Row, Col, Container } from 'react-bootstrap';
import Swal from 'sweetalert2'
import styled from 'styled-components';
import './App.css'


// ===========================================================================
// STYLED COMPONENTS =========================================================

const Header = styled.h1`
  background-color: #ff661a;
  color: black;
  text-transform: uppercase;
  font-size: 3.5em;
  padding-bottom: 2rem;
  padding-top: 2rem;
  font-family: 'Raleway', sans-serif;
  letter-spacing: 3px;
  text-align: center;
  @media (max-width: 656px) {
    font-size: 2.5em;
    }
`

const InstructionsBox = styled.div`
  margin-top: 2rem;
  white-space: pre-line; 
  background: #fafafa;
  box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);
  padding: 15px;
  border-radius: 15px;
`

const CalculateButton = styled.button`
  box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);
  padding: 15px;
  margin: 10px;
  border-radius: 15px;
  display: inline-block;
  width: 40%;
  border: none;
  color:#0D2451;
  background-color:#66ccff;
  padding: 14px 28px;
  font-size: 32px;
  cursor: pointer;
  text-align: center;
  height: 75px;
  transition: transform .2s;
  
  @media (max-width: 656px) {
    height: 90px;
    width: 90%;
    transform: scale(1);
    }
    &:hover {
        transform: scale(1.05);
    },
`;

const ResetButton = styled.button`
  box-shadow: 0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2);
  padding: 15px;
  margin: 10px;
  border-radius: 15px;
  display: inline-block;
  width: 40%;
  border: none;
  background-color: #ff6680;
  padding: 14px 28px;
  font-size: 32px;
  cursor: pointer;
  text-align: center;
  height: 75px;
  transition: transform .3s;

  @media (max-width: 656px) {
    width: 90%;
    transform: scale(1);
    }
    &:hover {
        transform: scale(1.05);
    },
`;

const Styles = styled.div`
  margin-top: .4rem;
    .form-control:focus {
        border-color: grey;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 0px grey;
    }
    input[type=text] {
        background-color: white;
        color: #0D2451;
        font-size: 25x;
        
        border: 1px solid grey;
        border-radius: 4px;
    }
    @media (max-width: 656px) {
      input[type=text] {
        color: #0D2451;
        font-size: 11px;
      }
    }
`;

// ===========================================================================
// ===========================================================================


// ===========================================================================
// GPA APP ===================================================================

function App() {

  // STATE MANAGEMENT ----------------------------------------------------
  const [gridInputs, setGridInputs] = useState({
    grade1: '', credit1: '',
    grade2: '', credit2: '',
    grade3: '', credit3: '',
    grade4: '', credit4: '',
    grade5: '', credit5: '',
    grade6: '', credit6: '',
  });

  const [baseState] = useState(gridInputs);
  // ----------------------------------------------------------------------

  // CHANGING STATE -------------------------------------------------------
  const resetToBaseState = () => {
    setGridInputs(baseState);
  }

  const handleGradeChange = (grade, e) => {
    setGridInputs({
      ...gridInputs, [grade]: e.target.value,
    });
  }

  const handleCreditChange = (credit, e) => {
    setGridInputs({
      ...gridInputs, [credit]: e.target.value,
    });
  }
  // ---------------------------------------------------------------------



  // POPUPS ---------------------------------------------------------------
  const showErrorBox = () => {
    return (
      Swal.fire({
        title: 'Error!',
        text: "One or more of the inputs is formatted incorrectly, make sure the grade is letter A through F and credits is a number",
        icon: 'error',
        cancelButtonText: 'Retry',
        showCancelButton: true,
        showConfirmButton: false,
      })
    );
  }

  const showAnswerBox = (answer) => {
    let message = returnAnswerString(answer);
    return (
      Swal.fire({
        title: message[0],
        footer: message[1],
        text: answer.toFixed(2),
        icon: message[2],
        cancelButtonText: 'Back',
        showCancelButton: true,
        showConfirmButton: false,
      })
    );
  }
  // ---------------------------------------------------------------------------


  // GPA CALCULATION -------------------------------------------------
  const returnAnswerString = (answer) => {
    answer = answer.toFixed(2)
    if (answer >= 3.0) {
      return [("Impressive! \nYour GPA is"), ("Congrats you're doing great!"), ('success')]
    }
    else if (answer > 2.5 && answer < 3.0) {
      return [("Not bad! \nYour GPA is"), ("Keep studying and bump it up!"), ('warning')]
    }
    else if (answer <= 2.5) {
      return [("Keep working hard!\n Your GPA is"), ("Your GPA is quite low but keep trying!"), ('error')]
    }
  }

  const convertGradeToNum = (grade, credit) => {
    grade = grade.toLowerCase();
    switch (grade) {
      case ('a'):
        return ((credit * 4));
      case ('b'):
        return ((credit * 3));
      case ('c'):
        return ((credit * 2));
      case ('d'):
        return ((credit * 1));
      case ('f'):
        return ((credit * 0));
    }
  }

  const getCalculation = (gradeArray, credits) => {
    let sumArray = []
    for (var i = 0; i < gradeArray.length; i++) {
      sumArray.push((convertGradeToNum(gradeArray[i], credits[i])))
    }
    return ((sumArray.reduce((a, b) => a + b, 0)) / credits.reduce((a, b) => a + b, 0));
  }

  const checkIfValidCredits = (creditArray) => {
    let newCredits = []
    for (var i = 0; i < creditArray.length; i++) {
      var integer = parseInt(creditArray[i], 10);
      if (Number.isInteger(integer) == true && creditArray[i].length != 0) {
        newCredits.push(integer);
      }
      else if (creditArray[i].length != 0) {
        showErrorBox()
        return;
      }
    }
    return newCredits;
  }

  const checkIfValidGrade = (gradeArray) => {
    let newGrades = []
    for (var i = 0; i < gradeArray.length; i++) {
      var s = gradeArray[i];
      if (s.match(/[a-f]/i) && s.length == 1) {
        newGrades.push(s);
      }
      else if (s.length != 0) {
        showErrorBox()
        return;
      }
    }
    return newGrades;
  }

  const calculateGPA = () => {
    let grades = [];
    let credits = [];
    let finalAnswer = null;

    Object.entries(gridInputs).map(([key, value]) => {
      if (key.includes("grade")) {
        grades.push(value)
      }
      if (key.includes("credit")) {
        credits.push(value)
      }
    })

    grades = checkIfValidGrade(grades);
    credits = checkIfValidCredits(credits);

    if (grades !== undefined && credits !== undefined) {
      finalAnswer = getCalculation(grades, credits);
      if (!isNaN(finalAnswer)) {
        showAnswerBox(finalAnswer);
      }
    }
  }
  // ---------------------------------------------------------------------------

  // RENDERING INDIVIDUAL ROWS
  const renderFormRow = (grade, credit) => {
    return (
      <Row >
        <Col  >
          <Styles>
            <Input name={grade} placeholder={"Letter Grade(A-F)"} value={gridInputs[grade]} onChange={(e) => handleGradeChange(grade, e)} />
          </Styles>
        </Col >
        <Col  >
          <Styles>
            <Input name={credit} placeholder={"Credits"} value={gridInputs[credit]} onChange={(e) => handleCreditChange(credit, e)} />
          </Styles>
        </Col>
      </Row>
    )
  }

  // RENDERING GRID
  const renderInputs = () => {
    return (
      <Fade bottom>
        <InstructionsBox>
          <div >
            {renderFormRow("grade1", "credit1")}
            {renderFormRow("grade2", "credit2")}
            {renderFormRow("grade3", "credit3")}
            {renderFormRow("grade4", "credit4")}
            {renderFormRow("grade5", "credit5")}
            {renderFormRow("grade6", "credit6")}
            <br />
          </div>
        </InstructionsBox>
      </Fade>
    )
  }

  //RENDERING INSTRUCTIONS
  const instructions = () => {
    return (
      <Fade bottom >
        <InstructionsBox>
            <h4>INSTRUCTIONS</h4>
            <p >
              {"1. For the letter grade column, put in your letter grade(A through F)\n" +
                "2. For the credits column put how many credits its worth\n" +
                "3. Leave the rest of the rows blank once you've put all your classes in\n" +
                "4. Press Calculate when done"}
            </p>
        </InstructionsBox>
      </Fade>
    )
  }


  return (
    <div>
      <Header>Gpa Calculator</Header>
      <Container>
        {instructions()}
        {renderInputs()}
        <br />
        <center>
          <CalculateButton onClick={calculateGPA} >
            CALCULATE
          </CalculateButton>
          <ResetButton onClick={resetToBaseState} >
            RESET
          </ResetButton>
        </center>
      </Container>
    </div>
  )
}

export default App;
// ===========================================================================
// ===========================================================================

