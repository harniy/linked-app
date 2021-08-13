const { MongoClient } = require('mongodb')
const express         = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())


const url = 'mongodb+srv://garniy:lucifer11@cluster0.wa0iz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const client = new MongoClient(url, { useUnifiedTopology: true })


const login = async(name, pass) => {
    console.log('Connect to MongoDB')
    await client.connect()
    const db = await client.db('linked')
    const collection = await db.collection('users')

    let checkUser = await collection.findOne({username: name})

    return checkUser
    /* collection.insertOne({username: name, password: pass}) */
}

const register = async(name, pass) => {
    await client.connect()
    const db = await client.db('linked')
    const collection = await db.collection('users')

    let checkUser = await collection.findOne({username: name})


    if(checkUser) {
        return false
    } else {
        collection.insertOne({username: name, password: pass, links: []})
        return {username: name, password: pass}
    }
}

const createLink = async (name, cat, url, user) => {
    await client.connect()
    const collection = await client.db('linked').collection('users')

    await collection.updateOne({username: user.username, password: user.password}, { $push: { links: { 
            name: name,
            category: cat,
            url: url
    } }})

    console.log('Link created~~~')
}

const getAllLinks = async (name, pass) => {
    await client.connect()
    const collection = await client.db('linked').collection('users')
    const user = await collection.findOne({username: name, password: pass})
    
    console.log('Get all links~~~')
    return user
}

const removeLink = async (user, link) => {
    await client.connect()
    const collection = await client.db('linked').collection('users')
    await collection.updateOne({username: user.username, password: user.password}, 
        { $pull: {links: {name:link.name, category: link.category, url: link.url}}})

}


app.post('/', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const loginInfo = await login(username, password) || false

    res.json(loginInfo)
})

app.post('/getLinks', async (req, res) => {
    const  { username }  = req.body
    const  { password }  = req.body

    const links = await getAllLinks(username, password)
    
    console.log('Get all User INFO~~~')
    res.json(links)
})

app.post('/register', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    let userRegister = await register(username, password)

    res.json(userRegister)
})

app.post('/addlink', async(req, res) => {
    const name = req.body.name
    const category = req.body.category !== '' ? req.body.category : 'another'
    const url = req.body.url
    const user = req.body.user

    console.log('Add link block')

    createLink(name, category, url, user)
    res.json()
})

app.post('/removeLink', (req, res) => {
    const { user } = req.body
    const { link } = req.body

    removeLink(user, link)
    res.json()
})

app.listen(1010, ()=>{
    console.log('Server start on PORT: 1010')
})