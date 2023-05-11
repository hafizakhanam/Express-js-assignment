const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

const port = 8000;
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


const books = [];

app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/books', (req, res) => {
    const book = {
        id: Date.now().toString(),
        title: req.body.title,
        author: req.body.author,
        publishedDate: req.body.publishedDate
    };
    books.push(book);
    res.json(book);
});


app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    books.splice(index, 1);

    res.json({ message: 'Book successfully deleted' });
});

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});