 const mysql = require('mysql2');
 const inquirer = require('inquirer');
 const cTable = require('console.table');

 const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Humayun$291',
      database: 'employee'
    },
    console.log('Connected to the election database.')
  );

 const data = () => {
    return inquirer.prompt ([
        {
            
                type: 'list',
                name: 'department',
                message: 'What would you like to see?',
                choices: ['View All Employees', 'Add An Employee', 'Update Employee Roles', 'View All Roles', 'Add Roles', 'View All Departments', 'Add Department', 'Quit']
                 
                },
            ])
            .then ((answer) => {

                console.log(answer)
                
                if (answer.department === 'View All Employees') {
                viewAllEmployees()
                  
               }
               else if (answer.department === 'View All Departments') {
                viewAllDepartments()
               }
               else if (answer.department === 'View All Roles') {
                viewAllRoles()
               }
               else if (answer.department === 'Add Department') {
                addDepartment()
               }
               else if (answer.department === 'Add Roles') {
                addRole()
               }
               else if (answer.department === 'Add An Employee') {
                addEmployee()
               }
               else if (answer.department === 'Update Employee Roles') {
                updateEmployee()
               }
               else if (answer.department === 'Quit') {
                 process.abort()
               }

            })
            
        }

const viewAllEmployees = () => {
  db.query(`SELECT * FROM employees`, (err, row) => {
    if (err) {
      console.log(err);
    }
    console.table(row);
    data();
  });
 
}

const viewAllDepartments = () => {
  db.query(`SELECT * FROM department`, (err, row) => {
    if (err) {
      console.log(err);
    }
    console.table(row);
    data();
  });
}

const viewAllRoles = () => {
  db.query(`SELECT * FROM roles`, (err, row) => {
    if (err) {
      console.log(err);
    }
    console.table(row);
    data();
  });
}

const addDepartment = () => {
   inquirer.prompt ([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your department?'
    }
  ])
  .then((nameDepartment) => {
    db.query(`INSERT INTO department (name) VALUES ('${nameDepartment.name}')`, (err, row) => {
      if (err) {
        console.log(err);
      }
      console.log('Successfully added to the department');
      data();
    });
  })

      
}

const addRole = () => {
  db.query(`SELECT * FROM department`, (err, row) => {
    if (err) {
      console.log(err);
    }
   
    const list = []
    for ( var i = 0; i < row.length; i++) {
      console.log(row[i])
      list.push({name:row[i].name, value:row[i].id})
    }
    console.log(list)
    inquirer.prompt ([
      {
        type: 'input',
        name: 'role',
        message: 'What is the name of the role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
      },
      {
        type: 'list',
        name: 'department',
        message: 'Which department does the role belongs to?',
        choices: list
       
      },
    ])
    .then((answers) => {
      console.log(answers)
      let sql = `INSERT INTO roles (title, department_id, salary) VALUES ('${answers.role}', ${answers.department}, '${answers.salary}')`
      db.query(sql, (err, row) => {
        if (err) {
          console.log(err);
        }
        console.table(row);
        data();
      });
    })
  
  })
  
      
}

const addEmployee = () => {
  db.query(`SELECT * FROM roles`, (err, row) => {
    if (err) {
      console.log(err);
    }})
  const list = []
    for ( var i = 0; i < row.length; i++) {
      console.log(row[i])
      list.push({name:row[i].name, value:row[i].id})
    }
  db.query(`SELECT * FROM employees`, (err, row) => {
      if (err) {
        console.log(err);
      }})
  const list2 = []
      for ( var i = 0; i < row.length; i++) {
        console.log(row[i])
        list2.push({name:row[i].name, value:row[i].id})
      }

  inquirer.prompt ([
    {
      type: 'input',
      name: 'firstname',
      message: 'What is the first name?'
    },
    {
      type: 'input',
      name: 'lastname',
      message: 'What is the last name?'
    },
    {
      type: 'list',
      name: 'department',
      message: 'What is the employees role?',
      choices: list
     
    },
    {
     type: 'list',
     name: 'managerID',
     message: 'Who is the employees manager?',
     choices: list2
    }
  ])
  .then(() => {
    let sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answers.firstname}', ${answers.lastname}, '${answers.department}', '${answers.managerID}')`
    db.query(sql, (err, row) => {
      if (err) {
        console.log(err);
      }
      console.table(row);
      data();
    });
  })

      
}

const updateEmployee = () => {
  inquirer.prompt ([
    {
      type: 'input',
      name: 'firstname',
      message: 'Which employees role you want to update?'
    }
   
  ])
  .then(() => {
    db.query(``, (err, row) => {
      if (err) {
        console.log(err);
      }
      console.table(row);
      data();
    });
  })

      
}
data()