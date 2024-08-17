DROP DATABASE IF EXISTS employee_management_db;

CREATE DATABASE employee_management_db;

\c employee_management_db;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);


SELECT setval(pg_get_serial_sequence('roles', 'id'), MAX(id)) FROM roles;

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY(manager_id) REFERENCES employees(id),
    FOREIGN KEY(role_id) REFERENCES roles(id)
);
