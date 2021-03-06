INSERT INTO department (name)
VALUES
  ('Cashier and Front End'),
  ('Food and Grocery'),
  ('General Merchandising'),
  ('Online Orderfilling and Delivery'),    
  ('Stocking and Unloading'),
  ('Auto Care Center'),
  ('Fuel Station'),
  ('Health and Wellness'), 
  ('Hourly Supervisor and Training'); 

  
INSERT INTO role (title, salary, department_id)
VALUES
  ('Regional Manager', 75500, 1),
  ('Store Manager', 45900, 2),
  ('Front End Manager', 25700, 1),
  ('New Hire Trainee', 31700, 9),
  ('Bakery Trainee', 31700, 9),
  ('Automotive Trainee', 37700, 9),
  ('Cashier', 25700, 1),
  ('Cashier', 25700, 7),
  ('Cashier', 25700, 8), 
  ('Online Orderfiller ', 5700, 4),
  ('Overnight Stocker', 28700, 5),
  ('Backend Inventory', 29700, 5),
  ('Auto Mechanic', 32757, 6),
  ('Baker', 25700, 2),
  ('Greeter', 25700, 3);
  

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 2, NuLL),
  ('Piers', 'Gaveston', 3, 2),
  ('Charles', 'LeRoi', 4, 1),
  ('Katherine', 'Mansfield', 5, 2),
  ('Dora', 'Carrington', 6, 2),
  ('Edward', 'Bellamy', 7, 1),
  ('Montague', 'Summers', 8, 2),
  ('Octavia', 'Butler', 9, 2),
  ('Unica', 'Zurn', 15, 1);
  
