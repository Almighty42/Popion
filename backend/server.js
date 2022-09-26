const { ApolloServer } = require("apollo-server-express")

const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')
// Mongoose
const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose');
const { MONGODB } = require('./config.js');

const PORT = 4000

const app = express()

const main = async () => {

    app.use(cors())

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        cors: {
            origin: ["https://ppopion.web.app", "https://studio.apollographql.com"],
            credentials: true
        },
        csrfPrevention: true,
        context: ({ req }) => {
            const auth = req.headers.authorization
            return { auth }
        }
    })

    await apolloServer.start().then(() => { return })

    apolloServer.applyMiddleware({ path: "/graphql", app })

    app.get('/favicon.ico', (res) => console.log('200'))

    mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        return app.listen(PORT, () => {
            console.log(`🚀  Server ready at ${PORT}`)
        })
    })

    app.get('/', (req,res) => {
        res.send("Hello world")
    })

}

main()
