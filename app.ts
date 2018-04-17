import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import * as morgan from 'morgan';
import api from './api';
import * as path from 'path';
const app = express();

app.use('/api', api);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname + '/../client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../client/build/index.html'));
});

app.set('port', process.env.PORT || '3000');
const server = app.listen(app.get('port'), () => {
    // tslint:disable-next-line:no-console
    console.log(`Express running → PORT ${server.address().port} on mode ${process.env.NODE_ENV}` );
});