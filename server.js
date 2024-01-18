const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'keshav',
    password: 'KS2166136',
    database: 'JSR'
});

// Welcome endpoint
app.get('/', (req, res) => {
    res.send("Welcome to the backend API");
});

// Get all users
app.get('/GET/users', (req, res) => {
    // Retrieve all users from the 'users' table
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        connection.query("SELECT * from users", (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
});

// Get user by ID
app.get('/GET/user/:userId', (req, res) => {
    const userId = req.params.userId;

    // Retrieve a specific user by ID from the 'users' table
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        const query = "SELECT * FROM users WHERE user_id = ?";
        connection.query(query, [userId], (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
});

// Create User
app.post('/POST/users', (req, res) => {
    // Extract user details from the request body
    const { first_name, last_name, email, password, slug, company_name, phone_number } = req.body;

    // Validate the incoming data (you may want to add more validation)
    if (!first_name || !last_name || !email || !password || !slug || !company_name || !phone_number) {
        return res.status(400).send("Incomplete user details. Please provide all required fields.");
    }

    // Insert the new user into the 'users' table
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }

        const query = "INSERT INTO users (first_name, last_name, email, password, slug, company_name, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)";
        connection.query(query, [first_name, last_name, email, password, slug, company_name, phone_number], (err, result) => {
            connection.release();

            if (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            }

            // Send a success response
            res.status(201).send("User created successfully");
        });
    });
});


// Get all products
app.get('/GET/products', (req, res) => {
    // Retrieve all products from the 'products' table
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        connection.query("SELECT * from products", (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
});

// Get product by ID
app.get('/GET/product/:productID', (req, res) => {
    const productID = req.params.productID;

    // Retrieve a specific product by ID from the 'products' table
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        const query = "SELECT * FROM products WHERE product_id = ?";
        connection.query(query, [productID], (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
});

// Add Product
app.post('/POST/products', (req, res) => {
    // Extract product details from the request body
    const { name, model, description, category_id, company_name, price, search_tags } = req.body;

    // Validate the incoming data (you may want to add more validation)
    if (!name || !model || !description || !category_id || !company_name || !price || !search_tags) {
        return res.status(400).send("Incomplete product details. Please provide all required fields.");
    }

    // Convert search_tags to JSON if it's a string
    const parsedSearchTags = typeof search_tags === 'string' ? JSON.parse(search_tags) : search_tags;

    // Insert the new product into the 'products' table
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }

        const query = "INSERT INTO products (name, model, description, category_id, company_name, price, search_tags) VALUES (?, ?, ?, ?, ?, ?, ?)";
        connection.query(query, [name, model, description, category_id, company_name, price, JSON.stringify(parsedSearchTags)], (err, result) => {
            connection.release();

            if (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            }

            // Send a success response
            res.status(201).send("Product added successfully");
        });
    });
});


// Get all status
app.get('/GET/status', (req, res) => {
    // Retrieve all status from the 'status' table
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        connection.query("SELECT * from status", (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
});

// Get status by ID
app.get('/GET/status/:statusID', (req, res) => {
    const statusID = req.params.statusID;

    // Retrieve a specific status by ID from the 'status' table
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        const query = "SELECT * FROM status WHERE status_id = ?";
        connection.query(query, [statusID], (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
});

app.post('/POST/status', (req, res) => {
    // Extract product details from the request body
    const { status } = req.body;

    // Validate the incoming data (you may want to add more validation)
    if (!status) {
        return res.status(400).send("Incomplete product details. Please provide all required fields.");
    }

    // Insert the new product into the 'products' table
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }

        const query = "INSERT INTO status (status) VALUES (?)";
        connection.query(query, [status], (err, result) => {
            connection.release();

            if (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            }

            // Send a success response
            res.status(201).send("Status added successfully");
        });
    });
});


// Get all orders
app.get('/GET/orders', (req, res) => {
    // Retrieve all orders from the 'orders' table
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        connection.query("SELECT * from orders", (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
});

// Get order by ID
app.get('/GET/order/:orderID', (req, res) => {
    const orderID = req.params.orderID;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        const query = "SELECT * FROM orders WHERE order_id = ?";
        connection.query(query, [orderID], (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
});

// Get order by ID
app.get('/GET/order/user/:userID', (req, res) => {
    const userID = req.params.userID;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        const query = "SELECT * FROM orders WHERE user_id = ?";
        connection.query(query, [userID], (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
});



// Place Order
// Place Order
app.post('/POST/orders', (req, res) => {
    // Extract order details from the request body
    const { user_id, address_id, total, products, invoice_id, date_ordered, date_delivered, status_id } = req.body;

    // Validate the incoming data (you may want to add more validation)
    if (!user_id || !address_id || !total || !products || !invoice_id || !date_ordered || !date_delivered || !status_id) {
        return res.status(400).send("Incomplete order details. Please provide all required fields.");
    }

    // Insert the new order into the 'orders' table
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }

        const query = "INSERT INTO orders (user_id, address_id, total, products, invoice_id, date_ordered, date_delivered, status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(query, [user_id, address_id, total, JSON.stringify(products), invoice_id, date_ordered, date_delivered, status_id], (err, result) => {
            connection.release();

            if (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            }

            // Send a success response
            res.status(201).send("Order placed successfully");
        });
    });
});



// Get all invoices
app.get('/GET/invoice', (req, res) => {
    // Retrieve all invoices from the 'invoice' table
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        connection.query("SELECT * from invoice", (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
});

// Get invoice by ID
app.get('/GET/invoice/:invoiceID', (req, res) => {
    const invoiceID = req.params.invoiceID;

    // Retrieve a specific invoice by ID from the 'invoice' table
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        const query = "SELECT * FROM invoice WHERE invoice_id = ?";
        connection.query(query, [invoiceID], (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
});

// Generate Invoice
app.post('/POST/invoices', (req, res) => {
    // Extract invoice details from the request body
    const { user_id, products, total, date_sent } = req.body;

    // Validate the incoming data (you may want to add more validation)
    if (!user_id || !products || !total || !date_sent) {
        return res.status(400).send("Incomplete invoice details. Please provide all required fields.");
    }

    // Insert the new invoice into the 'invoice' table
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }

        const query = "INSERT INTO invoice (user_id, products, total, date_sent) VALUES (?, ?, ?, ?)";
        connection.query(query, [user_id, products, total, date_sent], (err, result) => {
            connection.release();

            if (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            }

            // Send a success response
            res.status(201).send("Invoice generated successfully");
        });
    });
});


// Get all categories
app.get('/GET/categories', (req, res) => {
    // Retrieve all categories from the 'categories' table
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        connection.query("SELECT * from categories", (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
});

// Get category by ID
app.get('/GET/category/:categoryID', (req, res) => {
    const categoryID = req.params.categoryID;

    // Retrieve a specific category by ID from the 'categories' table
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        const query = "SELECT * FROM categories WHERE category_id = ?";
        connection.query(query, [categoryID], (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
});

// Create Category
app.post('/POST/categories', (req, res) => {
    // Extract category details from the request body
    const { name, description } = req.body;

    // Validate the incoming data (you may want to add more validation)
    if (!name || !description) {
        return res.status(400).send("Incomplete category details. Please provide all required fields.");
    }

    // Insert the new category into the 'categories' table
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }

        const query = "INSERT INTO categories (name, description) VALUES (?, ?)";
        connection.query(query, [name, description], (err, result) => {
            connection.release();

            if (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            }

            // Send a success response
            res.status(201).send("Category created successfully");
        });
    });
});


// Get all addresses
app.get('/GET/addresses', (req, res) => {
    // Retrieve all addresses from the 'addresses' table
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        connection.query("SELECT * from addresses", (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
});

// Get address by ID
app.get('/GET/address/:addressID', (req, res) => {
    const addressID = req.params.addressID;

    // Retrieve a specific address by ID from the 'addresses' table
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        const query = "SELECT * FROM addresses WHERE address_id = ?";
        connection.query(query, [addressID], (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
});

// Add Address
app.post('/POST/addresses', (req, res) => {
    // Extract address details from the request body
    const { st_address, landmark, city, state, postal_code, user_id } = req.body;

    // Validate the incoming data (you may want to add more validation)
    if (!st_address || !landmark || !city || !state || !postal_code || !user_id) {
        return res.status(400).send("Incomplete address details. Please provide all required fields.");
    }

    // Insert the new address into the 'addresses' table
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }

        const query = "INSERT INTO addresses (st_address, landmark, city, state, postal_code, user_id) VALUES (?, ?, ?, ?, ?, ?)";
        connection.query(query, [st_address, landmark, city, state, postal_code, user_id], (err, result) => {
            connection.release();

            if (err) {
                console.log(err);
                return res.status(500).send("Internal Server Error");
            }

            // Send a success response
            res.status(201).send("Address added successfully");
        });
    });
});


// Start the server
const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
