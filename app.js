const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const routes = require('./routes/index.js')
const cors = require('cors')

//Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(cors()) 
app.use(express.json()); 
app.use(express.urlencoded({extended : true}));
app.use(routes);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))