import App from "./application/app";

const port = process.env.PORT || 8080;

async function startServer() {
    try {
        const app = new App();
        await app.initializePool();
        app.express.listen(port, () => {
            console.log("The server is listening on port " + process.env.PORT);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
}

startServer();
