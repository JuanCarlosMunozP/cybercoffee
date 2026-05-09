import app from "./src/utils/api.js";

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})