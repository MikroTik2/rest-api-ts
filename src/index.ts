import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import config from './config';
import routes from './routes/index';
import errorMiddleware from './middlewares/error.middleware';

const PORT = process.env.PORT || process.env.PORT_NODE;

// создаем сервер экземляра
const app: Application = express();

config.connect();

// app - настройка 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(helmet());

app.get("/", (req: Request, res: Response) => {
     res.json("привет 🚀");
});

// routes
app.use("/api/v2", routes);

app.use(errorMiddleware);

app.use((req: Request, res: Response) => {
     res.status(404).json({
          success: false,
          message: "оооо зря.. тут такое не забывают",
     });
});

app.listen(PORT, () => {
     console.log(`==> Server working at port ${PORT} check to browser http://localhost:${PORT}`);
});

export default app;