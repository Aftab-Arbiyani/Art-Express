import express from 'express';
import path from 'path';
import compression from 'compression';
import cors from 'cors';
import apiLimiter from './middleware/rate-limiter';
import router from './routes';

// import AppError from './utils/appError';
// import globalErrorHandler from './controllers/errorController';

// import userRouter from './routes/userRouter';
// import viewRouter from './routes/viewRoutes';

// Start express app
const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiLimiter);

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// router
app.use(router);

// app.use("/", viewRouter);
// app.use("/api/v1/users", userRouter);

// app.all("*", (req, res, next) => {
//   next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
// });

// app.use(globalErrorHandler);

export default app;
