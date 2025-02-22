const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("data/db.json"); // Usa la ruta correcta a tu archivo JSON
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`JSON Server está corriendo en el puerto ${PORT}`);
});
