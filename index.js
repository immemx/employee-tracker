// Require statments
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection.js');

// Link to SQL switch in utils folder
const sql_switch = require('./utils/sql_switch')

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
            return;
        };

        // Pass Choice into switch function to respond to answer
        sql_switch(answers);
    })
}

startScreen();