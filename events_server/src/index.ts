import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";
import config from "./config";
import errorHandler from "./middlewares/errorHandler";
import "./db";

const app = express();
const PORT = config.PORT || 5000;

app.use(
	cors({
		origin: config.BASE_CLIENT_URL,
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
});
