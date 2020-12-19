DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

-- Created department table
CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(30)
 
);
-- Created role table
CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
);
-- Created employee table
CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT
);

-- Selects all from the 3 tables made above

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
-- inserted fake data entries for testing purposes
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("David", "Labins", 2, 1);
INSERT INTO department (name)
VALUE ("Software");
INSERT INTO role (title, salary, department_id)
VALUE ("Intern", 30000, 2);
