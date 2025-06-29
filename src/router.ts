import { Router } from "express"
import { createProduct, deleteProductById, getAllProducts, getProductByID, updateProductByID } from './handlers/product';
import { handleInputErrors } from "./middleware";
import { body } from "express-validator";
const router = Router()

router.get('/', getAllProducts,(req, res)=>{
    res.send("Hola ya casi pasas el parcial")
})
//create

router.get('/:id', getProductByID, (req, res)=>{
    res.send("Hola desde get by id")
})

// Toda este codigo deberia ir en el middleware dijo el profe
router.post('/', handleInputErrors,createProduct)

router.put('/:id',handleInputErrors, updateProductByID,(req,res)=>{
    res.send("Hola desde put")
})
router.delete('/:id',deleteProductById,(req,res)=>{
    res.send("Hola desde delete")
})
export default router