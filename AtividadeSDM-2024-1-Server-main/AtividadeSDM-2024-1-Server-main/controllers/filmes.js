import sgbd from '../sgbd.js'

const route = "/filmes"
const entity = "filmes"

function filmes(app) {
    app.get(route, function (req, res) {
        console.log('alguém fez requisição GET' + route);
        res.json(sgbd.db[entity])
    })

    app.post(route, function (req, res) {
        console.log('alguém fez requisição POST ' + route);
        console.log('conteúdo do body:', req.body);
        sgbd.db[entity].push(req.body);
        sgbd.write();
        console.log(sgbd.db[entity]);
        res.json(sgbd.db[entity][req.body.filmes]);
    })
    app.put(route + "/:id", function (req, res) {
        console.log('alguém fez requisição PUT ' + route + "/:id", req.params);
        console.log('conteúdo do body:', req.body);
        sgbd.db[entity] = req.body;
        sgbd.write()
        console.log(sgbd.db[entity])
        res.json(sgbd.db[entity][req.params.id])
    })

    app.delete(route + "/:id", function (req, res) {
        console.log('alguém fez requisição Delete ' + route + "/:id", req.params);
        delete sgbd.db[entity].splice(0,1)
        sgbd.write()
        res.json({})
    })
}

export default filmes