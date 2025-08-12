const Express = require("express");
const Route = Express.Router();
const { Leads, Create, View, Update, Delete } = require('./Lead_Controller')



Route.get('/', Leads)
Route.post('/', Create)
Route.get('/:id', View)
Route.patch('/:id', Update)
Route.delete('/:id', Delete)







module.exports = Route