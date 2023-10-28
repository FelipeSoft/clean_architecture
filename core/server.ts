import App from "./App";
import dotenv from 'dotenv';

dotenv.config();
const app = new App().express;
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("The server is listening on port " + port);
});