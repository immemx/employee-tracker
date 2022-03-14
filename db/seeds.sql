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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Kelly', 'Burbank', 5, 4),
    ('Tim', "CEO", 1, 2),
    ('Tommy', 'Lifter', 3, 4),
    ("Michael", "Scott", 2, 2),
    ("Gabe", "Newell", 4, 4);

