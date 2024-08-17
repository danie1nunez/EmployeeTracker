# Employee Management System

## Description

The **Employee Management System** is a comprehensive command-line tool designed to streamline and simplify the management of employee information within a company. Built with Node.js, Inquirer, and PostgreSQL, this application provides an intuitive interface for business owners and managers to interact with their employee database.

Whether you're handling large teams or just a few employees, this system enables you to:

- **View and Organize**: Access detailed reports of departments, roles, and employees. Easily view all relevant data in a structured format.
- **Add and Update**: Quickly add new departments, roles, and employees to your database. Update employee roles efficiently to reflect changes in job responsibilities.
- **Efficient Management**: Manage employee details with ease, including assigning roles, setting salaries, and linking employees with their managers.

With a focus on ease-of-use and functionality, this tool helps you keep track of essential employee data and make informed decisions to drive your business forward.

## Features

- **View Departments**: List all departments with their respective IDs, making it easy to see the organizational structure at a glance.
- **View Roles**: Display detailed information about job roles, including titles, IDs, associated departments, and salaries.
- **View Employees**: Obtain a comprehensive view of employee data, including IDs, names, roles, departments, salaries, and managerial relationships.
- **Add Department**: Insert new departments into the database to expand organizational capabilities.
- **Add Role**: Define new job roles with specific titles, salaries, and departmental affiliations.
- **Add Employee**: Enter new employee details, including their names, roles, and managers, to keep your records up-to-date.
- **Update Employee Role**: Modify the roles of existing employees, reflecting any changes in job positions or responsibilities.

## Database Schema

The application operates using a relational database schema with three primary tables:

- **Department Table**: Stores department information.
  - `id`: `SERIAL PRIMARY KEY`
  - `name`: `VARCHAR(30) UNIQUE NOT NULL`

- **Role Table**: Manages role details.
  - `id`: `SERIAL PRIMARY KEY`
  - `title`: `VARCHAR(30) UNIQUE NOT NULL`
  - `salary`: `DECIMAL NOT NULL`
  - `department_id`: `INTEGER NOT NULL`

- **Employee Table**: Records employee data.
  - `id`: `SERIAL PRIMARY KEY`
  - `first_name`: `VARCHAR(30) NOT NULL`
  - `last_name`: `VARCHAR(30) NOT NULL`
  - `role_id`: `INTEGER NOT NULL`
  - `manager_id`: `INTEGER`

## Technologies Used

- **Node.js**: A JavaScript runtime for server-side development.
- **Inquirer**: A library for interactive command-line interfaces.
- **PostgreSQL**: A powerful, open-source relational database system.
- **pg Package**: Node.js client for PostgreSQL.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

By using this application, you can efficiently manage and oversee your company's employee records, ensuring that all information is organized and easily accessible.
