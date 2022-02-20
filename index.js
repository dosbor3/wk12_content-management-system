const inquirer = require("inquirer");
const express = require('express');
const db = require('./db/connection');
const apiRoutes = require("./routes/apiRoutes");

const PORT = process.env.PORT || 3001;
const app = express();


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

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
            message: "What would you like to do? ",
            name: "action",
            choices: [                        
                        "View All Departments", 
                        "View All Roles",
                        "View All Employees",
                        "Add A Department",
                        "Add A Role",
                        "Add An Employee", 
                        "Update An Employee Role"
                    ]
        }

    ]).then(userChoice => {
        switch(userChoice.action) {
            case "View All Departments":
                viewAllDep();
                break;
            case "View All Roles":
                break;
            case "View All Employees":
                break;
            case "Add A Department":
                break;
            case "Add A Role":
                break;
            case "Add An Employee":
                break;
            case "Update An Employee Role":
                break;
        }
    })
}


//======================  View All Departments =======================
const viewAllDep = () => {
    router.get('/departments', (req, res) => {
        const sql = `SELECT * FROM departments`;
      
        db.query(sql, (err, rows) => {
          if (err) {
            console.log(res.status(500).json({ error: err.message }));
            return;
          }          
          console.table(res);
        });
        
      });
      startPrompt();
}

