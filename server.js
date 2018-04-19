import express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './schema';

// Config
const APP_PORT = 3000;

// Start
const app = express();

app.get('/', (request, response) => {
    response.sendfile("index.html");
});

// GraphQL
app.use('/graphql', GraphHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}));

app.use(express.static(__dirname + '/'));

app.listen(APP_PORT, ()=> {
    console.log(`App listening on port ${APP_PORT}`);
});