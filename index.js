const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/products', (req, res) => {
    res.send([
        {
            name: "Carrot",
            price: "10",
            unit: "kilo"
        },
        {
            name: "Chili",
            price: "2",
            unit: "kilo"
        }
    ])
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
