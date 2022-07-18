CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) 
);

CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT  PRIMARY KEY,
  title VARCHAR(30),
  salary decimal, 
  department_id INTEGER, 
  FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) ,
  last_name VARCHAR(30),
  role_id INTEGER,
  FOREIGN KEY(role_id) REFERENCES roles(id),
  manager_id INTEGER,
  FOREIGN KEY(manager_id) REFERENCES employees(id)
);