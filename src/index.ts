import express, {Request, Response} from 'express'
import {products, users} from "./utils/data";
import bodyParser from "body-parser";
import {emptyCheck} from "./helpers";

const app = express()

const port = process.env.PORT || 5000;

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.get('/', (req: Request, res: Response) => {
    res.send('Server 5000')
})
app.get('/products', (req: Request, res: Response) => {
    emptyCheck(products,res)
})
app.get('/products', (req: Request, res: Response) => {
    const searchString = req.query.title?.toString() || '';
    const filteredProducts = products.filter((p) => p.title.toLowerCase().includes(searchString));

    emptyCheck(filteredProducts,res)
});
app.post('/products', (req: Request, res: Response) => {
    const newProduct = {
        id: Number(new Date()),
        title: req.body.title
    }
    products.push(newProduct)

    res.status(201).send(newProduct)
})
app.get('/products/:id', (req: Request, res: Response) => {
    const product = products.find(({id}) => id === Number(req.params.id))
    emptyCheck(product,res)
})
app.put('/products/:id', (req: Request, res: Response) => {
    const searchEl = products.find(({id}) => id === Number(req.params.id))
    if (searchEl){
        searchEl.title = req.body.title
        res.status(200).send(searchEl)
    } else {
        res.send(404)
    }

})
app.get('/users/:id', (req: Request, res: Response) => {
    const searchUser = users.find(({id}) => id === Number(req.params.id))
    emptyCheck(searchUser,res)
})
app.delete('/users/:id', (req: Request, res: Response) => {
    users.forEach((user) => {
        if (user.id === Number(req.params.id)) {
            users.splice(user.id, 1)
            res.send(204)
        } else {
            res.send(404)
        }
    })

})

// start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
