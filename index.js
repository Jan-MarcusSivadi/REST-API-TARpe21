const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());        // Avoid CORS errors in browsers
app.use(express.json()) // Populate req.body

// app.use(express.urlencoded({ extended: true })); // Enable urlencoded req.body

const widgets = [
    { id: 1, name: "Cizzbor", price: 29.99 },
    { id: 2, name: "Woowo", price: 26.99 },
    { id: 3, name: "Crazlinger", price: 59.99 },
]

const persons = [
    { id: 1, name: "example", email: "example@gmail.com", age: 21, phone: "+1 (372) 295-6625" },
    { id: 2, name: "Lou Bonner", email: "loubonner@austex.com", age: 35, phone: "+1 (806) 581-3311" },
    { id: 3, name: "Holder Mclaughlin", email: "holdermclaughlin@coash.com", age: 27, phone: "+1 (861) 592-2327" },
    { id: 4, name: "Viola Zamora", email: "violazamora@isologica.com", age: 23, phone: "+1 (827) 529-2188" },
]

// GET http://localhost:8080/widgets
app.get('/widgets', (req, res) => {
    res.send(widgets)
})

// GET http://localhost:8080/widgets/:id
app.get('/widgets/:id', (req, res) => {
    const getIndex = widgets.findIndex(widget => widget.id === parseInt(req.params.id))
    if (getIndex === -1) {
        return res.status(404).send({ error: 'Widget not found' })
    }
    res.send(widgets[getIndex])
})

// POST http://localhost:8080/widgets
app.post('/widgets', (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    const ids = widgets.map((widget) => { return widget.id })
    const newId = Math.max(...ids)+1
    console.log(ids)
    console.log(newId)
    let newWidget = {
        id: newId,
        price: req.body.price,
        name: req.body.name
    }
    widgets.push(newWidget)
    res.status(201).location('localhost:8080/widgets/' + (widgets.length)).send(
        newWidget
    )
})

// DELETE http://localhost:8080/widgets/:id
app.delete('/widgets/:id', (req, res) => {
    // const myWidget = widgets.find(widget => widget.id === parseInt(req.params.id))
    const deleteIndex = widgets.findIndex(widget => widget.id === parseInt(req.params.id))
    if (deleteIndex === -1) {
        return res.status(404).send({error: 'Widget not found'})
    }
    widgets.splice(deleteIndex, 1)
    res.status(204).send({error: 'No content'})
})

app.listen(8080, () => {
    console.log(`API up at: http://localhost:8080`)
})