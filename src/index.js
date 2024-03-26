import app from "./app";

const main = () => {
  // Aquí se llama al método listen con el puerto definido previamente
  app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
  });
};

main();
