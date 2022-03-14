const sql_switch = (answer) => {

    switch (answer.options) {
        case 'view all departments': 
            console.log('Inside switch!')
            break;
        case 'view all roles':
            return;
        case 'view all employees':
            return;
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