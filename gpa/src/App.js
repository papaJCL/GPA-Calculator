import React, { Component } from 'react';
import { Input } from 'reactstrap'
import { Row, Col, Container , Jumbotron } from 'react-bootstrap';
import Swal from 'sweetalert2'
// import './node_modules/@sweetalert2/theme-dark';
import '../node_modules/@sweetalert2/theme-dark';
import styled from 'styled-components';


// function App() {
//   return (
//     <div className="App">
//       GPA Calculator
//     </div>
//   );
// }

// export default App;

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







class App extends Component {
    constructor(props) {
        super(props);

        this.calculateGPA = this.calculateGPA.bind(this)
        this.handleGradeChange = this.handleGradeChange.bind(this)
        this.handleCreditChange = this.handleCreditChange.bind(this)
        this.resetToBaseState = this.resetToBaseState.bind(this);


        this.state = {
            grade1: '', credit1: '',
            grade2: '', credit2: '',
            grade3: '', credit3: '',
            grade4: '', credit4: '',
            grade5: '', credit5: '',
            grade6: '', credit6: '',
        }

        this.baseState = this.state;
    }



    showErrorBox() {
        console.log("Landed on error")
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

    resetToBaseState() {
        this.setState(this.baseState);
    }

    returnAnswerString(answer) {
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

    showAnswerBox(answer) {
        let message = this.returnAnswerString(answer);
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


    checkIfValidGrade(gradeArray) {
        let newGrades = []
        for (var i = 0; i < gradeArray.length; i++) {
            var s = gradeArray[i];
            if (s.match(/[a-f]/i) && s.length == 1) {
                newGrades.push(s);
            }
            else if (s.length != 0) {
                this.showErrorBox();
                return;
            }
        }
        return newGrades;
    }

    checkIfValidCredits(creditArray) {
        let newCredits = []
        for (var i = 0; i < creditArray.length; i++) {
            var integer = parseInt(creditArray[i], 10);
            if (Number.isInteger(integer) == true && creditArray[i].length != 0) {
                newCredits.push(integer);
            }
            else if (creditArray[i].length != 0) {
                this.showErrorBox();
                return;
            }
        }
        return newCredits;
    }

    convertGradeToNum(grade, credit) {
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

    getCalculation(gradeArray, credits) {
        let sumArray = []
        for (var i = 0; i < gradeArray.length; i++) {
            sumArray.push((this.convertGradeToNum(gradeArray[i], credits[i])))
        }
        return ((sumArray.reduce((a, b) => a + b, 0)) / credits.reduce((a, b) => a + b, 0));
    }


    calculateGPA() {
        let grades = [];
        let credits = [];
        let finalAnswer = null;
        const a = this.state;
        Object.entries(a).map(([key, value]) => {
            if (key.includes("grade")) {
                grades.push(value)
            }
            if (key.includes("credit")) {
                credits.push(value)
            }
        })
        grades = this.checkIfValidGrade(grades);
        credits = this.checkIfValidCredits(credits);
        if (grades !== undefined && credits !== undefined) {
            finalAnswer = this.getCalculation(grades, credits);
            if (!isNaN(finalAnswer)) {
                this.showAnswerBox(finalAnswer);
            }
        }
    }

    handleGradeChange(grade, e) {
        this.setState({
            [grade]: e.target.value,
        });
    }

    handleCreditChange(credit, e) {
        this.setState({
            [credit]: e.target.value,
        });
    }

    explainCard() {
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
        );
    }

    renderFormRow(grade, credit) {
        return (
            <Row >
                <Col  >
                    <Styles>
                        <Input name={grade} placeholder={"Letter Grade(A-F)"} value={this.state[grade]} onChange={(e) => this.handleGradeChange(grade, e)} />
                    </Styles>
                </Col >
                <Col  >
                    <Styles>
                        <Input name={credit} placeholder={"Credits"} value={this.state[credit]} onChange={(e) => this.handleCreditChange(credit, e)} />
                    </Styles>
                </Col>
            </Row>
        )
    }

    renderInputs() {
        return (
            <div >
                {this.renderFormRow("grade1", "credit1")}
                {this.renderFormRow("grade2", "credit2")}
                {this.renderFormRow("grade3", "credit3")}
                {this.renderFormRow("grade4", "credit4")}
                {this.renderFormRow("grade5", "credit5")}
                {this.renderFormRow("grade6", "credit6")}
                <br />
                <Button onClick={this.calculateGPA} >
                    <div className="w3-opacity">
                        <b>CALCULATE</b>
                    </div>
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={this.resetToBaseState} >
                    <div className="w3-opacity">
                        <b>RESET</b>
                    </div>
                </Button>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Jumbotron message="GPA CALCULATOR" pic="gpaPic" />
                <Container>
                    {this.explainCard()}
                    <br />
                    {this.renderInputs()}
                </Container>
            </div>
        )
    }

}

export default App;
