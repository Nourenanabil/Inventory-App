import { Category } from '../models/categories'
import express from 'express'
const categoryRouter = express.Router()

categoryRouter.get('/categories', async (req, res) => {

    try {

        const categories = await Category.find({})
        res.status(200).send(categories)
    }
    catch (e) {

        res.status(500).send(e)
    }
})

categoryRouter.get('/categories/:id', async (req, res) => {

    try {

        const categoryId = req.params.id
        const category = await Category.findById(categoryId)
        res.status(200).send(category)
    }
    catch (e) {

        res.status(400).send(e)

    }
})

categoryRouter.post('/categories', async (req, res) => {

    try {
        
        const category = new Category(req.body)
        await category.save()
        return res.status(201).send(category)
    }
    catch (e) {

        res.status(400).send(e)
    }

})


categoryRouter.delete('/categories/:id', async (req, res) => {
    try {

        const categoryId = req.params.id
        const category = Category.findById(categoryId)

        if (!category) {

            res.status(404).send("not found")
        }

        await category.remove()
        res.status(202).send("category deleted")

    }
    catch (e) {
        res.status(500).send(e)


    }
})

categoryRouter.patch('/categories/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name']
    const isvalidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isvalidOperation) {

        return res.status(400).send("Error : invalid update")
    }

    try {

        const categoryId = req.params.id;
        const category = await Category.findById(categoryId)

        if (!category) {
            return res.status(404).send("not found")
        }

        updates.forEach((update) => {
            category[update] = req.body[update]
        })
        await category.save()

        res.status(200).send(category)

    }
    catch (e) {
        res.status(500).send(e)
    }
})


export default categoryRouter;

