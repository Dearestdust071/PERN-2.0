import { Router } from "express"
import { createProduct, deleteProductById, getAllProducts, getProductByID, updateAvailability, updateProductByID } from './handlers/product';
import { handleInputErrors } from "./middleware";
import{ check, Result, validationResult, body, param} from 'express-validator';
import { createUser, deleteUsersById, getAllUsers, getUsersByID, updateUsersByID } from "./handlers/users";
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



// GET all users
router.get("/", getAllUsers, (req, res) => {
  res.send("Listado de usuarios obtenido correctamente");
});

// GET user by ID
router.get(
  "/:id",
  param("id").isNumeric().withMessage("ID tiene que ser numérico."),
  param("id").isInt().withMessage("ID tiene que ser entero."),
  handleInputErrors,
  getUsersByID,
  (req, res) => {
    res.send("Usuario obtenido por ID");
  }
);

// CREATE user
router.post(
  "/",
  body("username")
    .notEmpty().withMessage("Falta el nombre de usuario")
    .isString().withMessage("Formato de nombre de usuario inválido"),
  body("email")
    .notEmpty().withMessage("Falta el email")
    .isEmail().withMessage("Formato de email inválido"),
  body("password")
    .notEmpty().withMessage("Falta el password")
    .isString().withMessage("Formato de password inválido")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("role")
    .optional()
    .isIn(["user", "admin"]).withMessage("Role inválido, permitido: user o admin"),
  handleInputErrors,
  createUser
);

// UPDATE user
router.put(
  "/:id",
  param("id").isNumeric().withMessage("ID tiene que ser numérico."),
  param("id").isInt().withMessage("ID tiene que ser entero."),
  body("username")
    .optional()
    .isString().withMessage("Formato de nombre de usuario inválido"),
  body("email")
    .optional()
    .isEmail().withMessage("Formato de email inválido"),
  body("password")
    .optional()
    .isString().withMessage("Formato de password inválido")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("role")
    .optional()
    .isIn(["user", "admin"]).withMessage("Role inválido, permitido: user o admin"),
  handleInputErrors,
  updateUsersByID,
  (req, res) => {
    res.send("Usuario actualizado");
  }
);

// DELETE user
router.delete(
  "/:id",
  param("id").isNumeric().withMessage("ID tiene que ser numérico."),
  param("id").isInt().withMessage("ID tiene que ser entero."),
  handleInputErrors,
  deleteUsersById,
  (req, res) => {
    res.send("Usuario eliminado");
  }
);

// PATCH user availability
router.patch(
  "/:id",
  param("id").isNumeric().withMessage("ID tiene que ser numérico."),
  param("id").isInt().withMessage("ID tiene que ser entero."),
  handleInputErrors,
  updateAvailability,
  (req, res) => {
    res.send("Estado de disponibilidad actualizado");
  }
);


export default router