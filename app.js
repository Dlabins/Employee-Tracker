const inquirer = require("inquirer")
const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Bootcamp",
    database: "employeeDB"
  });

  connection.connect(function(err) {
    if (err) 
    throw err
    databaseQuestions();
});

function databaseQuestions(){
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to view?",
            choices: ["Add department", "Add role", "Add employee", "View departments", "View roles", "View employees", "Make update to employee"]
        }
    ]).then(function(val) {
        switch (val.choice) {
            case "Add department":
            addDepartment();
            break;
              
            case "Add role":
            addRole();
            break;
            
            case "Add employee":
            addEmployee();
            break;
              
            case "View departments":
            viewDepartments();
            break;
        
            case "View role":
            viewRole();
            break;

            case "View employees":
            viewEmployees();
            break;
    
            case "Make update to employee":
            updateEmployee();
            break;
            }
    })
}
//function to query for employees
function viewEmployees() {
    connection.query("SELECT * FROM employee", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      databaseQuestions()
  })
}
//function to query for roles
function viewRole() {
  connection.query("SELECT * FROM role", 
  function(err, res) {
  if (err) throw err
  console.table(res)
  databaseQuestions()
  })
}
//function to query for departments
function viewDepartments() {
  connection.query("SELECT * FROM department", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    databaseQuestions()
  })
}

//function to add employee via command line
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Please enter employee's first name!"
        },
        {
          name: "lastname",
          type: "input",
          message: "Please enter employee's last name!"
        },
        {
          name: "role",
          type: "input",
          message: "What is the employee's role?"
        },
        {
            name: "manager",
            type: "input",
            message: "What is the manager's name for this employee?"
        }
    ])
}