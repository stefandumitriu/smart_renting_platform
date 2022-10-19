import express from 'express';

const app = express();
const port = 3001;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});
