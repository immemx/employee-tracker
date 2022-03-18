// Require statments
const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./db/connection.js');

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
            connection.end();
            return;
        };

        // Pass Choice into switch function to respond to answer
        sql_switch(answers);
    })
}

// Switch for main prompt
const sql_switch = (answer) => {

    // Switch processing the selection from inquirer and redirecting.
    switch (answer.options) {
    // Case for seeing ALL DEPT.
        case 'view all departments':
            const sqlAllDept = `SELECT * FROM department`
            connection.query(sqlAllDept, (err, result) => {
                if(err) {
                    console.log(`There has been an error: ${err}`)
                    return;
                }
                console.table(result)
                prompt();
            })
    // Case for seeing ALL ROLES
        case 'view all roles':
            const sqlAllRoles = `SELECT * FROM role`
            db.query(sqlAllRoles, (err, result) => {
                if(err) {
                    console.log(`There has been an error: ${err}`)
                    return;
                }
                console.table(result)
                return;
            })
            return;
    // Case for seeing ALL EMPLE.
        case 'view all employees':
            return;
    // Case for ADDing a DEPT.
        case 'add a department':
            return;

        case 'add a role':
            return;

        case 'add an employee':
            return;

        case 'update an employee role':
            return;
    };
}

startScreen();