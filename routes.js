// --------------- Import de controllers --------------- //
const UserController = require('./controllers/user');

// ------------------- Funções Exportadas ------------------- //
module.exports = (app) => {
    app.post('/users', UserController.create);
    app.get('/users', UserController.list);
    app.get('/users/:_id', UserController.detail);
    app.delete('/users/:_id', UserController.remove);
    app.patch('/users/:_id', UserController.update);
};
