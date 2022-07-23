 //Here we have the mySQL package
 const mysql = require('mysql2');
 //Here we have the inquirer package
 const inquirer = require('inquirer');
 //here we have the console table package
 const cTable = require('console.table');
//Here we create a connection to our mysql database
 const db = mysql.createConnection(
    {
      //host we will be working with
      host: 'localhost',
      //root is the location
      user: 'root',
      //password to get into mysql
      password: 'Humayun$291',
      //name of the database
      database: 'employee'
    },
    //here we print a message to let the user know that we are successfully connected to the database
    console.log('Connected to the election database.')
  );
//Here we have arrow function
 const data = () => {
  //which returns a inquirer prompt 
    return inquirer.prompt ([
        {
            //Here we have the type list and question being asked to the user and the user would then have to select out of the following choices
                type: 'list',
                name: 'department',
                message: 'What would you like to see?',
                choices: ['View All Employees', 'Add An Employee', 'Update Employee Roles', 'View All Roles', 'Add Roles', 'View All Departments', 'Add Department', 'Quit']
                 
                },
            ])
            //we used .then function with a given parameter
            .then ((answer) => {

                console.log(answer)
                //Here we will use if else statements to see what will happen when the if statements execute in this case if the user choose the following
                if (answer.department === 'View All Employees') {
                //view all employees function will be executed
                viewAllEmployees()
                  
               }
               //else if the user choose the following
               else if (answer.department === 'View All Departments') {
                //this function will be executed
                viewAllDepartments()
               }
               //else if the user choose the following
               else if (answer.department === 'View All Roles') {
                //this function will be executed
                viewAllRoles()
               }
               //else if the user choose the following
               else if (answer.department === 'Add Department') {
                //this function will be executed
                addDepartment()
               }
               //else if the user choose the following
               else if (answer.department === 'Add Roles') {
                //this function will be executed
                addRole()
               }
               //else if the user choose the following
               else if (answer.department === 'Add An Employee') {
                //this function will be executed
                addEmployee()
               }
               //else if the user choose the following
               else if (answer.department === 'Update Employee Roles') {
                //this function will be executed
                updateEmployee()
               }
               //else if the user choose the following
               else if (answer.department === 'Quit') {
                //this function will be executed which is to abort from the application
                 process.abort()
               }

            })
            
        }
//Here we have our first function
const viewAllEmployees = () => {
  //we db query the all the fields under the employees table from schema.sql and used to left join to put them altogehter and print 
  db.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title AS role, CONCAT(manager.first_name , "  " , manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees manager ON employees.manager_id = manager.id`, (err, row) => {
    if (err) {
      //if we get an errot it will thorw an error
      console.log(err);
    }
    //otherwise it will print out the employees and its fields
    console.table(row);
    //"data" fucntion would then get implemented in which this function has been put there as a callback function inside an if statments
    data();
  });
 
}
//Here we have our function for viewalldepartments
const viewAllDepartments = () => {
  //here we just db query to get all the data from the department table and its fields
  db.query(`SELECT * FROM department`, (err, row) => {
    //if we get an errot it will thorw an error
    if (err) {
      console.log(err);
    }
    //otherwise it will print out the departments and its fields
    console.table(row);
     //"data" fucntion would then get implemented in which this function has been put there as a callback function inside an if statements
    data();
  });
}
// Here we have our function for viewAllRoles 
const viewAllRoles = () => {
  //we db query the all the fields under the roles table from schema.sql and used to left join to put them altogehter and print 
  db.query(`SELECT roles.id, roles.title, roles.salary, department.name AS department FROM roles LEFT JOIN department ON roles.department_id = department.id`, (err, row) => {
    //if we get an errot it will thorw an error
    if (err) {
      console.log(err);
    }
     //otherwise it will print out the departments and its fields
    console.table(row);
    //"data" fucntion would then get implemented in which this function has been put there as a callback function inside an if statements
    data();
  });
}
//Here we have the function to add the department
const addDepartment = () => {
   // we have a inquirer prompt to ask the details in regards to the user wants to add 
   inquirer.prompt ([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your department?'
    }
  ])
  // we use .then function with a parameter
  .then((nameDepartment) => {
    //using db query we insert the department with its value equals to the parameter . name which came from the inquirer prompt
    db.query(`INSERT INTO department (name) VALUES ('${nameDepartment.name}')`, (err, row) => {
      //if we get an errot it will thorw an error
      if (err) {
        console.log(err);
      }
      //else it would print the following message
      console.log('Successfully added to the department');
       //"data" fucntion would then get implemented in which this function has been put there as a callback function inside an if statements
      data();
    });
  })

      
}
//Here we have the function to add role
const addRole = () => {
  //Here we db query department first since we want to know where does this role belongs to
  db.query(`SELECT * FROM department`, (err, row) => {
    //if we get an errot it will thorw an error
    if (err) {
      console.log(err);
    }
   //inside this db query we create an empty array 
    const list = []
    //then we have for loop that will loop through all the departments in this instance row is referred to department
    for ( var i = 0; i < row.length; i++) {
      //and it will print out all the departments
      console.log(row[i])
      //so now we will push department name we want add this role along with the id
      list.push({name:row[i].name, value:row[i].id})
    }
  
    console.log(list)
    //then we will have inquirer prompt asking what is the name of the role and etc etc you want to put in the corresponding department that you chose above
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
        //notice here we put list for the choices since everything is stored in this array we created above in line 163
        choices: list
       
      },
    ])
    //here we have .then function
    .then((answers) => {
      console.log(answers)
      //where we let sql equals to insert the role and so its folowing which includes title salary and department id
      let sql = `INSERT INTO roles (title, department_id, salary) VALUES ('${answers.role}', ${answers.department}, '${answers.salary}')`
      //we db query sql for implementation
      db.query(sql, (err, row) => {
         //if we get an errot it will thorw an error
        if (err) {
          console.log(err);
        }
        //else it would print the following message
        console.log("Successfully added the role");
         //"data" fucntion would then get implemented in which this function has been put there as a callback function inside an if statements
        data();
      });
    })
  
  })
  
      
}
//here we have addemployee function
const addEmployee = () => {
  //we db query from roles to print all the roles in which you want the employee to be added 
  db.query(`SELECT * FROM roles`, (err, row) => {
     //if we get an errot it will thorw an error
    if (err) {
      console.log(err);
    }
    //inside this db query we create an empty array 
    const list = []
    //then we have for loop that will loop through all the departments in this instance row is referred to roles
    for ( var i = 0; i < row.length; i++) {
       //and it will print out all the roles
      console.log(row[i])
      //so now we will push role title we want add this role along with the id
      list.push({name:row[i].title , value:row[i].id})
    }
    //inside this db query we created another db query to show all employees
    db.query(`SELECT * FROM employees`, (err, row) => {
        //if we get an errot it will thorw an error
      if (err) {
        console.log(err);
      }
      //inside this db query we create an empty array named list2
      const list2 = []
      //then we have for loop that will loop through all the employees in this instance row is referred to employees
      for ( var i = 0; i < row.length; i++) {
        //and it will print out all the roles
        console.log(row[i])
        //so now we will push employees first name and last name we want add this employee along with the id
        list2.push({name:row[i].first_name + ' ' + row[i].last_name, value:row[i].id})
      }
  //we have the inquirer prompt to ask for details for the employee
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
  //then we have .then function with the parameter 
  .then((answers) => {
     //where we let sql equals to insert the role and so its folowing which includes first name, last name,  managerID and department id
    let sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answers.firstname}', '${answers.lastname}', '${answers.department}', '${answers.managerID}')`
     //inside this db query we created another db query to show all employees
    db.query(sql, (err, row) => {
      //if we get an errot it will thorw an error
      if (err) {
        console.log(err);
      }
      //else it would print the following message
      console.log("Successfully added!");
      //"data" fucntion would then get implemented in which this function has been put there as a callback function inside an if statements
      data();
    });
  })
    
    })
  

  })
  
  
      
}
//Here we have the function to update employee
const updateEmployee = () => {
  //here we db query the employees table 
  db.query(`SELECT * FROM employees`, (err, row) => {
    //if we get an errot it will thorw an error
    if (err) {
      console.log(err);
    }
    //inside this db query we create an empty array named list2
    const list2 = []
    //then we have for loop that will loop through all the employees in this instance row is referred to employees
    for ( var i = 0; i < row.length; i++) {
      //and it will print out all the employees
      console.log(row[i])
       //so now we will push employees first name and last name we want add this employee along with the id
      list2.push({name:row[i].first_name + ' ' + row[i].last_name, value:row[i].id})
    }
    //we db query from roles to print all the roles in which you want the employee to update
    db.query(`SELECT * FROM roles`, (err, row) => {
      //if we get an error it will thorw an error
      if (err) {
        console.log(err);
      }
      //inside this db query we create an empty array named list3
      const list3 = []
      //then we have for loop that will loop through all the departments in this instance row is referred to roles
      for ( var i = 0; i < row.length; i++) {
        //and it will print out all the roles
        console.log(row[i])
         //so now we will push role title we want add this role along with the id
        list3.push({name:row[i].title, value:row[i].id})
      }
      //here we have inquirer prompt with the following questions
    inquirer.prompt ([
      {
        type: 'list',
        name: 'updateEmployee',
        message: 'Which employees role you want to update?',
        //notice here we put list for the choices since everything is stored in this array we created above in line 308
        choices: list2
      },
      {
        type: 'list',
        name: 'updateRole',
        message: 'Which role you want to update?',
        //notice here we put list for the choices since everything is stored in this array we created above in line 323
        choices: list3

      }
     
    ])
    //we then have.then statement
    .then((answers) => {
      //here we db query to update employees ans set the role id to the role user wants to update where id is coressponded with the roles list
      db.query(`UPDATE employees SET role_id = '${answers.updateRole}' WHERE id = '${answers.updateEmployee}'`, (err, row) => {
         //if we get an error it will thorw an error
        if (err) {
          console.log(err);
        }
        //Here it prints out the following message 
        console.log("Updated Successfully");
        //"data" fucntion would then get implemented in which this function has been put there as a callback function inside an if statements
        data();
      });
    })
  })
})

      
}
//Here i have call the only function to start the application
data()