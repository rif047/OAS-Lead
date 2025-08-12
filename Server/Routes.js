const Express = require('express');
const Route = Express.Router();


// const Lead = require('./API/Lead/Lead_Route.js');


// const Property = require('./API/Property/Property_Route.js');
// const Customer = require('./API/Customer/Customer_Route.js');
// const Client = require('./API/Client/Client_Route.js');
// const Expense_Category = require('./API/Expense/Expense_Category/Expense_Category_Route.js');
// const Expense = require('./API/Expense/Expense_Route.js');
const User = require('./API/User/User_Route.js');


Route.get('/', (req, res) => res.send('Server Running'));


// Route.use('/leads', Lead);

// Route.use('/properties', Property);

// Route.use('/customers', Customer);

// Route.use('/clients', Client);

// Route.use('/expenses', Expense);
// Route.use('/expense_categories', Expense_Category);

Route.use('/users', User);


Route.use((err, req, res, next) => {
    console.error('Error in routes:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = Route;
