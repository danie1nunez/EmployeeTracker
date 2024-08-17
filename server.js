const inquirer= require('inquirer');
const { Pool } = require('pg');
require('dotenv').config();


const pool= new Pool (
    {
        // Enter PostgreSQL username
        user: 'postgres',
        // Enter PostgreSQL password
        password: process.env.DB_PW,
        host: 'localhost',
        database: 'employee_management_db'
    },
    console.log('Connected to the courses_db database!')
)


pool.connect();

async function init() {
     const answers= await inquirer.prompt([
        {
            type: 'list',
            name:'action',
            message:'choose an option',
            choices:['view all departments', 'view all roles', 'view all employees', 'add a department','add a role', 'add an employee', 'update an employee role']
        }
    ])
    if (answers.action === 'view all departments') {
        viewdepartments();
    }else if(answers.action ==='view all roles'){
        viewroles();
    }else if(answers.action ==='view all employees'){
        viewemployees();
    }else if(answers.action ==='add a department'){
        adddepartment();
    }else if(answers.action ==='add a role'){
       addrole();
    }else if(answers.action ==='add an employee'){
        addemployee();
    }else{
        updateemployee();
    }
};

async function viewdepartments(){
    const {rows}= await pool.query('SELECT id AS "Department ID", name AS "Department Name" FROM department')
    console.table(rows);
    init();
    return rows;
}

async function viewemployees(){
    const {rows}= await pool.query(`
    SELECT 
        employees.id AS "Employee ID", 
        employees.first_name AS "First Name", 
        employees.last_name AS "Last Name", 
        roles.title AS "Job Title",
        roles.id AS "Role ID",
        department.name AS "Department", 
        roles.salary AS "Salary", 
        CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager"
    FROM 
        employees
    JOIN 
        roles ON employees.role_id = roles.id
    JOIN 
        department ON roles.department_id = department.id
    LEFT JOIN 
        employees manager ON employees.manager_id = manager.id;
`);
    console.table(rows);
    init();
    return rows;
}

async function viewroles(){
    const {rows}= await pool.query(` 
    SELECT 
        roles.id AS "Role ID", 
        roles.title AS "Job Title", 
        department.name AS "Department", 
        roles.salary AS "Salary"
    FROM 
        roles
    JOIN 
        department ON roles.department_id = department.id;
    `);
    console.table(rows);
    init();
    return rows;
}

async function adddepartment(){
   try {
        const answers= await inquirer.prompt([
            {
                type:'input',
                name:'addDepartment',
                message:'what department do you want to add?',
            }
        ]);
        const result= await pool.query('INSERT INTO department (name) VALUES ($1)',[answers.addDepartment]);
        console.table(`${answers.addDepartment} Department was created!\n`);
        viewdepartments();
    } catch(err) {
        console.error(err);
    };
    init();
    
};

async function addrole(){
   try {
        const { rows: department } = await pool.query('SELECT id, name FROM department');

        const answers= await inquirer.prompt([
            {
                type:'input',
                name:'title',
                message:'what role do you want to add?'
            },
            {
                type:'input',
                name:'salary',
                message:'What will the salary be?'
            },
            {
                type:'list',
                name:'department',
                message:'what department will this be in?',
                choices: department.map(d => ({ name: d.name, value: d.id}))
            }
        ]);
        
        const result= await pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [answers.title, answers.salary, answers.department]);
        console.table(`${answers.title} was created!\n`);
        viewroles();
    } catch(err) {
        console.error(err);
    };
    init();
    
};

async function addemployee(){
   try {
        const { rows: roles } = await pool.query('SELECT id, title FROM roles');
        const { rows: employees } = await pool.query('SELECT id, first_name, last_name FROM employees');

        const managerChoices = [{ name: 'None', value: null }, ...employees.map(e => ({ name: `${e.first_name} ${e.last_name}`, value: e.id }))];

        const answers= await inquirer.prompt([
            {
                type:'input',
                name:'first',
                message:'Enter the new employees First name'
            },
            {
                type:'input',
                name:'last',
                message:'Enter the new employees Last name'
            },
            {
                type:'list',
                name:'role',
                message:'choose employees role',
                choices: roles.map(r => ({ name: r.title, value: r.id }))
            },
            {
                type:'list',
                name:'manager',
                message:'who is the employees manager?',
                choices: managerChoices
            }
        ]);
        const result= await pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',[answers.first, answers.last, answers.role, answers.manager]);
        console.table(`${answers.first}, ${answers.last} employee was created!\n`);
        viewemployees();
    } catch(err) {
        console.error(err);
    };
    init();
};

async function updateemployee(){
   try {
        const {rows: employees}=  await pool.query('SELECT id, first_name, last_name FROM employees');
        const {rows: roles}= await pool.query('SELECT id, title FROM roles');

            const answers= await inquirer.prompt([
                {
                    type:'list',
                    name:'empID',
                    message:'What employee will have their role changed?',
                    choices: employees.map(e => ({ name: `${e.first_name} ${e.last_name}`, value: e.id }))
                },
                {
                    type:'list',
                    name:'role',
                    message:'what new role will they have?',
                    choices: roles.map(r => ({ name: r.title, value: r.id }))
                },
            ]);
            const {first_name, last_name}= employees[answers.empID-1];
            const update= pool.query('UPDATE employees SET role_id= $1 where id= $2', [answers.role, answers.empID]);
            console.log(`employee was updated!\n`);
        } catch(err) {
            console.error(err);
        };
        init();
};
    
    
    init();