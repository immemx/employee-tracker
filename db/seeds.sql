INSERT INTO department (name)
VALUES
    ('Management'),
    ('Tech'),
    ('Style'),
    ('Inbound'),
    ('General Merchandise');

INSERT INTO role (title, salary, department_id)
VALUES
    ('CEO', 1000000, 1),
    ('Manager', 100000, 1),
    ('Boxmover', 20000, 4),
    ('Stocker', 15000, 5),
    ('Dressing Room', 15000 , 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ('Tim', "CEO", 1),
    ('Kelly', 'Burbank', 5),
    ('Tommy', 'Lifter', 3),
    ("Michael", "Scott", 2),
    ("Gabe", "Newell", 4);

UPDATE employee SET manager_id = 1 WHERE role_id = 1;
UPDATE employee SET manager_id = 1 WHERE role_id = 2;
UPDATE employee SET manager_id = 1 WHERE role_id = 3;
UPDATE employee SET manager_id = 1 WHERE role_id = 4;
UPDATE employee SET manager_id = 1 WHERE role_id = 5;


