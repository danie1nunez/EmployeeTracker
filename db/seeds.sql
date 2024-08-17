-- TRUNCATE TABLE employees, roles, department RESTART IDENTITY CASCADE;

INSERT INTO department(name)
VALUES ('Finance'),
       ('Legal'),
       ('I.T'),
       ('Sales');

INSERT INTO roles(title, salary, department_id)
VALUES ('Sales person', 60000, 4),
       ('Sales Manager', 130000, 4),
       ('I.T Manager', 127000, 3),
       ('Software Engineer', 100000, 3),
       ('Lawyer', 115000, 2),
       ('Paralegal', 100000, 2),
       ('Accounting Manager', 80000, 1),
       ('Financial Analyst', 120000, 1);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 2, NULL),
       ('Jane', 'Smith', 1, 1),
       ('Flynn', 'Cruz', 4, 4),
       ('John', 'Wick', 3, NULL),
       ('Dominique', 'Wilkins', 5, NULL),
       ('Rachel', 'Zane', 6, NULL),
       ('Mia', 'Nunez', 8, 8),
       ('Chris', 'Zang', 7, NULL);