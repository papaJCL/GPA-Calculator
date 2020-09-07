import React, { useState, Component } from 'react';
import { Input } from 'reactstrap'
import { Row, Col, Container, Jumbotron } from 'react-bootstrap';
import Swal from 'sweetalert2'
import '../node_modules/@sweetalert2/theme-dark';
import styled from 'styled-components';
import './App.css'


// ===========================================================================
// STYLED COMPONENTS =========================================================

const Button = styled.button`
    background: #222;
    border: none;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 6px;
    color: #bbb;
    margin:20px
    transition-duration: 0.4s;
    -webkit-transition-duration: 0.4s; 
    transition-duration: 0.4s;
    font-size: 16px;
    border-radius: 12px;
    &:hover {
        color: white;
    },
    .btn:focus, .btn:active {
        outline: none !important;
        box-shadow: none !important;
      }
`;

const Styles = styled.div`
    .form-control:focus {
        border-color: grey;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 0px grey;
    }
    input[type=text] {
        background-color: white;
        color: black;
        font-size: 25x;
        
        border: 1px solid grey;
        border-radius: 4px;
        
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
      <div >
        {renderFormRow("grade1", "credit1")}
        {renderFormRow("grade2", "credit2")}
        {renderFormRow("grade3", "credit3")}
        {renderFormRow("grade4", "credit4")}
        {renderFormRow("grade5", "credit5")}
        {renderFormRow("grade6", "credit6")}
        <br />
        <Button onClick={calculateGPA} >
          <div className="w3-opacity">
            <b>CALCULATE</b>
          </div>
        </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={resetToBaseState} >
          <div className="w3-opacity">
            <b>RESET</b>
          </div>
        </Button>
      </div>
    )
  }

  //RENDERING INSTRUCTIONS
  const instructions = () => {
    return (
      <div className="display-linebreak">
        <h4 className="w3">INSTRUCTIONS</h4>
        <div className="hr" />
        <p className="w3-text-grey">
          {"1. For the letter grade column, put in your letter grade(A through F)\n" +
            "2. For the credits column put how many credits its worth\n" +
            "3. Leave the rest of the rows blank once you've put all your classes in\n" +
            "4. Press Calculate when done"}
        </p>
      </div>
    )
  }


  return (
    <div>
      <Jumbotron />
      <Container>
        {instructions()}
        <br />
        {renderInputs()}
      </Container>
    </div>
  )
}

export default App;
// ===========================================================================
// ===========================================================================

