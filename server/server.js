import config from '../config/config'
import app from './express'
import mongoose from 'mongoose'


mongoose.connect(config.mongoUri)
    .then(result => console.log("conectado ao DB"))
    .catch(err => console.log(err))


app.listen(config.port, err => {
    if (err) {
        console.log(err)
    }

    console.info("Server started on port %s", config.port)
})

//devBundle.compile(app)
