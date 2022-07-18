INSERT INTO department (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');


INSERT INTO roles (title, department_id, salary)
VALUES
  ('Sales Lead',1, '75000'),
  ('Software Engineer', 2, '95000'),
  ('Finance Manager', 3, '80000'),
  ('Lawyer', 4, '90000'),
  ('Salesperson', 1, '55000');


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Derek', 'Jarman', 1, null),
  ('Paolo', 'Pasolini', 2, 1),
  ('Heathcote', 'Williams', 3, 2),
  ('Sandy', 'Powell', 4, 3),
  ('Emily', 'Zola', 5, 4);
  
  