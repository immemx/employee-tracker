const db = require('../db/connection.js');
const cTable = require('console.table');

const sql_switch = (answer) => {

    switch (answer.options) {
    // Case for seeing ALL DEPT.
        case 'view all departments':
            const sqlAllDept = `SELECT * FROM department`
            db.query(sqlAllDept, (err, result) => {
                if(err) {
                    console.log(`There has been an error: ${err}`)
                    return;
                }
                console.table(result)
                return;
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

module.exports = sql_switch;