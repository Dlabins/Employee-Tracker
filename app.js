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
          name: "firstName",
          type: "input",
          message: "Please enter employee's first name!"
        },
        {
          name: "lastName",
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
    ]).then(function(track){
        const tracker = "INSERT INTO employee SET ?";
        connection.query(tracker, 
          { 
            first_name: track.firstName,
            last_name: track.lastName,
            role_id: track.role,
            manager_id: track.manager
          }, 
        function(err, data) {
            if (err) throw err;
            console.log("Employee has been saved!");
            databaseQuestions();
        });
      })
  }
  //function to add department via command line
  function addDepartment(){ 
    inquirer.prompt(
        {
          name: "addDepartment",
          type: "input",
          message: "Please enter the department name!",
      }).then(function(track){
        const tracker = "INSERT INTO department SET ?";
        connection.query(tracker, 
          { 
            name: track.addDepartment 
          }, 
    function(err, data) {
        if (err) throw err;
        console.log("Department has been saved!");
        databaseQuestions();
        });
      })
  }
  //function to add role via command line
  function addRole(){ 
    inquirer.prompt([
        {
          name: "role",
          type: "input",
          message: "Please enter the name of the role!",
        },
        {
          name: "salary",
          type: "input",
          message: "Please enter the salary!",
        },
        {
          name: "id",
          type: "input",
          message: "Please enter the department ID!",
        },
      ]).then(function (track){
        const tracker = "INSERT INTO role SET ?";
        connection.query(tracker, 
          { 
            title: track.role,
            salary: track.salary,
            department_id: track.id
          }, 
          function(err, data) {
            if (err) throw err;
            console.log("New role has been saved!");
            databaseQuestions();
        });
      });
  };
 