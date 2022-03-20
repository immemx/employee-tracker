// Require statments
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

// Display the starting program message
const startScreen = () => {
    console.clear();
    console.log(`
    
    Welcome! to your Employment Portal!
    
    `)

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
            const sqlAllRoles = `SELECT role.id, role.title, department.name AS department
            FROM role
            INNER JOIN department ON role.department_id = department.id`
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
            const sqlAllEmployee = `SELECT employee.id, 
            employee.first_name, 
            employee.last_name, 
            role.title, 
            department.name AS department,
            role.salary, 
            CONCAT (manager.first_name, " ", manager.last_name) AS manager
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON employee.manager_id = manager.id`
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
    // Case for ADDing a ROLE.
        case 'add a role':
            addRole();
            break;
    // Case for ADDing a Employee
        case 'add an employee':
            addEmployee();
            break;
    //Case for Updateing an employee Role!
        case 'update an employee role':
            updateEmployee();
            break;
    };
};

// ADD A DEPARTMENT
const addDept = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "What is the name of the new DEPARTMENT?",
        }    
    ])
    .then((answer) => {
        const insert = answer.deptName;
        const sqlAddDept = `INSERT INTO department (name) VALUES ('${insert}')`

        db.query(sqlAddDept, (err, result) => {
            if(err) {
                console.log(`There has been an error: ${err}`)
            }
            console.table(result);
            console.log(`
            
            Your new Department has been added!
            
            `)
            prompt();
        });
    })
};

// ADD A NEW ROLE
const addRole = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "roleName",
            message: "What is the name of the new Role",
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the salary of the new Role",
        },
        {
            type: "input",
            name: "roleDept",
            message: "What is the ID of the department this role is under?",
        }
    ])
    .then((answer) => {
        const sqlAddRole = `INSERT INTO role (title, salary, department_id) VALUES ('${answer.roleName}', '${answer.roleSalary}', '${answer.roleDept}')`

        db.query(sqlAddRole, (err, result) => {
            if(err) {
                console.log(`There has been an error: ${err}`)
            }
            console.table(result);
            console.log(`
            
            Your new Role has been added!
            
            `)
            prompt();
        });
    })
};

// ADD EMPLOYEE
const addEmployee = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "first",
            message: "What is the first name of the new employee?",
        },
        {
            type: "input",
            name: "last",
            message: "What is the last name of the new employee?",
        },
        {
            type: "input",
            name: "roleid",
            message: "What is the Role ID for this employee",
        },
        {
            type: "input",
            name: "managerid",
            message: "What is the Manager ID for this employee",
        }
    ])
    .then((answer) => {
        const sqlAddRole = `INSERT INTO role (first_name, last_name, role_id, manager_id) VALUES ('${answer.first}', '${answer.last}', '${answer.roleid}', '${answer.managerid}')`

        db.query(sqlAddRole, (err, result) => {
            if(err) {
                console.log(`There has been an error: ${err}`)
            }
            console.table(result);
            console.log(`
            
            Your new Employee has been added!
            
            `)
            prompt();
        });
    })
};

// UPDATE AN EMPLOYEE
const updateEmployee = () => {
    const sqlEmployee = `SELECT * FROM employee`;

    db.query(sqlEmployee, (err, result) => {
        if (err) {
            console.log(`There has been an error: ${err}`)
        }

        const employee = result.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: "Which EMPLOYEE would you like update?",
                choices: employee
            }
        ])
        .then(answer => {
            let employeeAnswer = answer.employee;

            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) {
                    console.log(`There has been an error: ${err}`)
                };

                const roles = result.map(({ id, title }) => ({ name: title, value: id }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'roles',
                        message: "What would you like the employees new role to be?",
                        choices: roles
                    }
                ])
                .then(roleAnswers => {
                    let chosenRole = roleAnswers.roles;
                    const sqlUpdate = `Update employee SET role_id = ${chosenRole} WHERE id = ${employeeAnswer}`

                    db.query(sqlUpdate, (err, result) => {
                        if (err) {
                            console.log(`There was an error: ${err}`);
                        }
                    })
                    console.log(`
                    
                    The Employee has been updated!
                    
                    `)
                    prompt();
                })
            })
        })
    })
}

startScreen();