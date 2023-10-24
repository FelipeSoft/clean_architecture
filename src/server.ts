import App from "./application/app";

const app = new App();
const port = process.env.PORT || 8080;

app.express.listen(port, () => {
    console.log("The server is listening on port " + port);
    app.initializePool();
});

export const pool = app.getPool();