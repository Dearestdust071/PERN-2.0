import { Router } from "express"
import { createProduct, deleteProductById, getAllProducts, getProductByID, updateAvailability, updateProductByID } from './handlers/product';
import { handleInputErrors } from "./middleware";
import{ check, Result, validationResult, body, param} from 'express-validator';
const router = Router()

router.get('/', getAllProducts,(req, res)=>{
    res.send("Hola ya casi pasas el parcial")
})
//create

router.get('/:id', 
    param('id').isNumeric().withMessage("ID tiene que ser numerico.") 
,param('id').isInt().withMessage("ID tiene que ser entero."),
handleInputErrors
,getProductByID, (req, res)=>{
    res.send("Hola desde get by id")
})


// Toda este codigo deberia ir en el middleware dijo el profe
router.post('/', 
    body('price')
         .notEmpty().withMessage('Falto el precio')
         .isNumeric().withMessage('El formato es invalid0')
         .custom((value)=> value > 0).withMessage('El valor no es aceptado en precio') 
         ,body("name")
         .notEmpty().withMessage('Falto el nombre')
         .isString().withMessage('El formato es invalid0')
         .custom((value)=> value.length > 0).withMessage('El valor no es aceptado en nombre'),
         handleInputErrors,
        createProduct)

router.put('/:id', 
    param('id').isNumeric().withMessage("ID tiene que ser numerico."),
    param('id').isInt().withMessage("ID tiene que ser entero."),
    body('price')
         .notEmpty().withMessage('Falto el precio')
         .isNumeric().withMessage('El formato es invalid0')
         .custom((value)=> value > 0).withMessage('El valor no es aceptado en precio') 
         ,body("name")
         .notEmpty().withMessage('Falto el nombre')
         .isString().withMessage('El formato es invalid0')
         .custom((value)=> value.length > 0).withMessage('El valor no es aceptado en nombre'),
    handleInputErrors, updateProductByID,(req,res)=>{
    res.send("Hola desde put")
})
router.delete('/:id',deleteProductById,(req,res)=>{
    res.send("Hola desde delete")
})


router.patch('/:id', 
    param('id').isNumeric().withMessage("ID tiene que ser numerico."),
    param('id').isInt().withMessage("ID tiene que ser entero."),
    handleInputErrors, updateAvailability,(req,res)=>{
    res.send("Hola desde patch")
})


export default router