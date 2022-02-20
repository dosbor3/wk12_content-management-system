//server.js
const inquirer = require("inquirer");
const mysql = require("mysql2");
const express = require('express');
const router = express.Router();
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const consoleTable = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);


router.use(require("./routes/apiRoutes/departmentsRoutes"));
router.use(require("./routes/apiRoutes/employeesRoutes"));
router.use(require("./routes/apiRoutes/rolesRoutes"));

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

const startPrompt = () => {
  inquirer.prompt([
      {
          type: "list",
          message: "What would you like to do ? ",
          name: "action",
          choices: [                        
                      "View All Departments", 
                      "View All Roles",
                      "View All Employees",
                      "View A Department",
                      "Add A Department",                      
                      "Add A Role",
                      "Add An Employee",
                      "Delete A Department",
                      "Delete A Role",  
                      "Delete An Employee",
                      "Update An Employee Role"
                  ]
      }
  ]).then(val => {
      switch(val.action) {
          case "View All Departments":
            viewDepartments();
            break;
          case "View All Roles":
            viewRoles();
            break;
          case "View All Employees":
            viewEmployees();
            break;
          case "View A Department":
            viewDepartment();
            break;
          case "Add A Department":
            addDepartment();
            break;          
          case "Add A Role":
            addRole();
            break;
          case "Add An Employee":
            addEmployee();
            break;
          case "Delete A Department":
            deleteDepartment();
            break;
          case "Delete A Role":
            deleteRole();
            break;     
          case "Delete An Employee":
            deleteDepartment();
            break;     
          case "Update An Employee Role":
            updateEmployee();
            break;         
      }
  })
}


//======================  View All Departments =======================
const viewDepartments = () => {
  router.get('/departments', (req, res) => {
      const sql = `SELECT * FROM departments`;
    
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(res.status(500).json({ error: err.message }));
          return;
        }          
        console.table(rows);
        startPrompt();
      });
      
    });
   
}
//======================  View All Roles =======================

const viewRoles = () => {
  router.get('/roles', (req, res) => {
      const sql = `SELECT * FROM roles`;
    
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(res.status(500).json({ error: err.message }));
          return;
        }          
        console.table(rows);
        startPrompt();
      });
      
    });
    
}

//======================  View All Employees =======================
const viewEmployees = () => {
  router.get('/employees', (req, res) => {
      const sql = `SELECT * FROM employees`;
    
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(res.status(500).json({ error: err.message }));
          return;
        }          
        console.table(rows);
      });
      
    });
    startPrompt();
}

//======================  View A Single Department =======================
const viewDepartment = () => {
  // Get single department 
  router.get('/departments/:id', (req, res) => {
    const sql = `SELECT * FROM departments WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
      if (err) {
        console.log(res.status(400).json({ error: err.message }));
        return;
      }
      console.table(row);
      startPrompt();
    });
  });
}

//======================  Add A Department =======================
const addDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What department do you wish to add ? "
    }
    
  ]).then(res => {
    // Create a department
    router.post('/departments', ({ body }, res) => {
      const errors = inputCheck(body, 'name');
      if (errors) {
        console.log(res.status(400).json({ error: errors }));
        return;
      }
  
      const sql = `INSERT INTO departments (name) VALUES (?)`;
      const params = [body.name];
  
      db.query(sql, params, (err, result) => {
        if (err) {
         console.log(res.status(400).json({ error: err.message }));
          return;
        }
        console.table(body);
        startPrompt();
      });
    });

  }); 
}
//======================  Add A Role =======================
const addRole = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "role",
      message: "What role do you wish to add? "
    },
    {
      type: "input", 
      name: "salary", 
      message: "What salary accompanies this role? "
    }
  ]).then(res => {
    // Create a role
    router.post('/roles', ({ body }, res) => {
      const errors = inputCheck(
        body,
        'title',
        'salary',
        'department_id'
      );
      if (errors) {
        res.status(400).json({ error: errors });
        return;
      }

      const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
      const params = [
        body.title,
        body.salary,
        body.department_id
      ];

      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(res.status(400).json({ error: err.message }));
          return;
        }
        console.log(res.json({
          message: 'success',
          data: body
        }));
        console.table(body);
      });
    });
  });
}

//======================  Add An Employee =======================
const addEmployee = () => {
  // Create an employee
  router.post('/employees', ({ body }, res) => {
    const errors = inputCheck(
      body,
      'first_name',
      'last_name',
      'role_id',
      'manager_id'
    );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [
      body.first_name,
      body.last_name,
      body.role_id,
      body.manager_id
    ];

    db.query(sql, params, (err, result) => {
      if (err) {
        console.log(res.status(400).json({ error: err.message }));
        return;
      }
      console.table(body);
    });
  });
}

//======================  Delete A Department =======================
const deleteDepartment = () => {
  // Delete a department
  router.delete('/departments/:id', (req, res) => {
    const sql = `DELETE FROM departments WHERE id = ?`;

    db.query(sql, req.params.id, (err, result) => {
      if (err) {
        res.status(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        console.log(res.json({
          message: 'Departments not found'
        }));
      } else {
        console.table(res);
      }
    });
  });
}

//======================  Delete A Role =======================
const deleteRole = () => {
  // Delete a role
  router.delete('/roles/:id', (req, res) => {
    const sql = `DELETE FROM roles WHERE id = ?`;

    db.query(sql, req.params.id, (err, result) => {
      if (err) {
        res.status(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        console.log(res.json({
          message: 'Role not found'
        }));
      } else {
        console.table(res);
      }
    });
  });
}

//======================  Delete An Employee =======================
const deleteEmployee = () => {
  // Delete an employee
  router.delete('/employees/:id', (req, res) => {
    const sql = `DELETE FROM employees WHERE id = ?`;

    db.query(sql, req.params.id, (err, result) => {
      if (err) {
        res.status(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
        });
      } else {
        console.table(res);
      }
    });
  });
}

//======================  Update An Employee =======================
const updateEmployee = () => {
  // Update an employee's role
  router.put('/employees/:id', (req, res) => {
    const errors = inputCheck(req.body, 'party_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

    const sql = `UPDATE employees SET role_id = ? 
                WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.affectedRows) {
        console.log(res.json({
          message: 'Employee not found'
        }));
      } else {
        console.table({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });
}