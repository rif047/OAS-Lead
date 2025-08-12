const Express = require("express");
const Route = Express.Router();
const { Properties, Create, View, Update, UpdateOffering, CancelOffering, UpdateStatus, Delete, uploadImages } = require('./Property_Controller')



Route.get('/', Properties)
Route.post('/', uploadImages, Create)
Route.get('/:id', View)
Route.patch('/:id', uploadImages, Update)
Route.patch('/offering/:id', UpdateOffering)
Route.patch('/cancel/:id', CancelOffering)
Route.patch('/status/:id', UpdateStatus)
Route.delete('/:id', Delete)







module.exports = Route