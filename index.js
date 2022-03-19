// Require statments
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

// Display the starting program message
const startScreen = () => {
    console.clear();
    console.log("Welcome! to your employment portal!")

    // Starting inquirer
    prompt();
}

// Main menu prompt
const prompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: '~~What would you like to do?~~',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit']
        }
    ])
    .then((answers) => {

        // Check to see if quit was selected
        if(answers.options === 'quit') {
            db.end();
            return false;
        };

        // Pass Choice into switch function to respond to answer
        sql_switch(answers);
    })
}

// Switch for main prompt
const sql_switch = (answer) => {
    console.log(answer)
    // Switch processing the selection from inquirer and redirecting.
    switch (answer.options) {
    // Case for seeing ALL DEPT.
        case 'view all departments':
            const sqlAllDept = `SELECT * FROM department`
            db.query(sqlAllDept, (err, result) => {
                if(err) {
                    console.log(`There has been an error: ${err}`)
                    return;
                }
                console.table(result);
                prompt();
            })
            break;
    // Case for seeing ALL ROLES
        case 'view all roles':
            const sqlAllRoles = `SELECT * FROM role`
            db.query(sqlAllRoles, (err, result) => {
                if(err) {
                    console.log(`There has been an error: ${err}`)
                    return;
                }
                console.table(result);
                prompt();
            })
            break;
    // Case for seeing ALL EMPLE.
        case 'view all employees':
            const sqlAllEmployee = `SELECT * FROM employee`
            db.query(sqlAllEmployee, (err, result) => {
                if(err) {
                    console.log(`There has been an error: ${err}`)
                }
                console.table(result);
                prompt();
            })
            break;
    // Case for ADDing a DEPT.
        case 'add a department':
            // Pushing to function with seperate inquirer
            addDept();
            break;

        case 'add a role':
            addRole();
            break;

        case 'add an employee':
            break;

        case 'update an employee role':
            break;
    };
}

const addDept = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "What is the name of your new DEPARTMENT?",
        }    
    ])
    .then((answer) => {
        const insert = answer.deptName;
        console.log(insert);
        const sqlAddDept = `INSERT INTO department (name) VALUES ('${insert}')`

        db.query(sqlAddDept, (err, result) => {
            if(err) {
                console.log(`There has been an error: ${err}`)
            }
            console.table(result);
            console.log('Your new Department has been added!')
            prompt();
        });
    })
}

startScreen();