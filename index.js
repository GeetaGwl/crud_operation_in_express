const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const mysql = require('mysql2');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',     
    password: 'root',  
    database: 'express_db',  
  });
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });

// Serve the registration form
app.get('/reg', (req, res) => {
    res.sendFile(__dirname + '/public/regis.html');
});

// Handle registration form submission
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

 
    const insertUserQuery = `
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
    `;

    // Execute the INSERT statement
    db.query(insertUserQuery, [username, email, password], (err, results) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).send('Error registering user');
        } else {
            res.redirect('/users');
        }
    });
});

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users'; // Replace 'users' with your table name

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.render('users', { users: results });
        }
    });
});

app.get('/edit/:id', (req, res) => {
    const userId = req.params.id;
    const selectUserQuery = 'SELECT * FROM users WHERE id = ?';

    db.query(selectUserQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            res.status(500).send('Error fetching user data');
        } else {
            const user = results[0]; // Assuming the query returns a single user
            res.render('edit-user', { user });
        }
    });
});

app.post('/edit/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;

    const updateQuery = 'UPDATE users SET username = ?, email = ? WHERE id = ?';

    db.query(updateQuery, [name, email, userId], (err, results) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).send('Error updating user');
        } else {
            res.redirect('/users'); // Redirect to the user list page
        }
    });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});
app.get('/delete/:id', (req, res) => {
    const userId = req.params.id;
    const deleteQuery = 'DELETE FROM users WHERE id = ?';

    db.query(deleteQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).send('Error deleting user');
        } else {
            res.redirect('/users'); // Redirect to the user list page
        }
    });
});

// Route for the login page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
