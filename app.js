import express from 'express'
import usersRouter from './routers/users.router.js'
import charactersRouter from './routers/characters.router.js'
import weaponsRouter from './routers/weapons.router.js'
import armorsRouter from './routers/armors.router.js'
import accessoriesRouter from './routers/accessories.router.js'
import statsRouter from './routers/stats.router.js'
import binit from './ini.js'
import * as OpenApiValidator from 'express-openapi-validator'

const app = express()

binit()

app.use(OpenApiValidator.middleware({
  apiSpec:'./openapi-main.yaml'
  /*validateRequests: true,
  validateResponses: true*/
}))


app.use(express.json())

app.use('/users', usersRouter)
app.use('/characters', charactersRouter)
app.use('/weapons', weaponsRouter)
app.use('/armors', armorsRouter)
app.use('/accessories', accessoriesRouter)
app.use('/stats', statsRouter)

app.post('/', (req, res) => {
  res.json(req.body)
})

app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  })
})

export default app
//sequalize pour lien avec db