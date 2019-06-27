module.exports = (app) => {
    const bugs = require('../controllers/bug.controller.js');

    app.post('/bugs', bugs.create);

    app.get('/bugs', bugs.findAll);

    app.get('/bugs/:bugId', bugs.findOne);

    app.put('/bugs/:bugId', bugs.update);

    app.delete('/bugs/:bugId', bugs.delete);
}