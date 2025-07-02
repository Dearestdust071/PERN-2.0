
import server from "./server"

const port = process.env.PORT || 4000
server.listen(port, ()=>{
console.log(`Mi puerto esta escuchando en el puerto : ${port}`)
})



// serve.test.ts 
// COnfiguracion de supertest
// Manejart totas las pruebas en una carpeta
// __test__ 

