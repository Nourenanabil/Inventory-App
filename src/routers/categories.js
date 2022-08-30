const Category = require('../models/categories')
const express = require('express')
const router = express.Router()

router.post('/category' , async(req,res)=>{

    try{

        const category = new Category(req.body)
        await category.save()
        res.status(201).send(category)
    }
    catch(e){
        res.status(400).send(e)
    }

})


router.get('/category/:id'  , async(req,res)=>{
    try{

        const category = await Category.findById(req.params.id)
        res.status(200).send(category)
    }
    catch(e){

        res.status(400).send(e)

    }
})

router.get('/categories'  , async(req,res)=>{

    try{

        const categories = await Category.find({})
        res.status(200).send(categories)
    }
    catch(e){

        res.status(500).send(e)


    }
})

router.delete('/categories' , async(req,res)=>{

    try{

        const category = Category.find({})
        await category.remove()
        res.status(200).send("all categories are deleted")
         
    }
    catch(e){
        res.status(400).send(e)


    }
})

router.delete('/category/:id' , async (req,res)=>{
    try{

        const category = Category.findById(req.params.id)
        if(!category){
            res.status(404).send("not found")

        }
        await category.remove()
        res.status(202).send("category deleted")

    }
    catch(e){
        res.status(500).send(e)


    }
})

router.patch('/category/:id'  , async (req,res)=>{
   

        const updates = Object.keys(req.body)
        const allowedUpdates = ['name']
        const isvalidOperation = updates.every((update)=>allowedUpdates.includes(update))

        if(!isvalidOperation){
    
            return res.status(400).send("Error : invalid update")
        }
        try{
        const category = await Category.findById(req.params.id)

        if(!category){
            return res.status(404).send("not found")
        }

        updates.forEach((update)=>{
            category[update]= req.body[update]
        })
        await category.save()

        res.status(200).send(category)

    }
    catch(e){
        res.status(500).send(e)
    }
})

router.patch('/categories' , async(req,res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name']
    const isvalidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isvalidOperation){

        return res.status(400).send("Error : invalid update")
    }
    try{
    const categories = await Category.find({})

    if(!categories){
        return res.status(404).send("not found")
    }

    updates.forEach((update)=>{

        categories.forEach(async (category)=>{

            category[update]= req.body[update]
            await category.save()

        })

    })
    

    res.status(200).send(categories)

}
catch(e){
    res.status(500).send(e)
}
})
module.exports = router

