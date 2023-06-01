import express from 'express';
import userRouter from './resources/user/user.router';
import dtpRouter from './resources/dtp/dtp.router';
import complexRouter from './resources/complex/complex.router';
const app = express();

app.use(express.json());

app.use('/',(req, res, next) => {
    if (req.originalUrl === '/') {
        res.send("Server is running");
        return;
    }
    next();
})


app.use('/api/user', userRouter); 
app.use('/api/dtp', dtpRouter);
app.use('/api/complex', complexRouter);

export default app;