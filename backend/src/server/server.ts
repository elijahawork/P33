import express from 'express'
import Database from '../api/Database'
const app = express()
const port = 3000
const db = new Database()

app.get('/get_user', (req, res) => {
    // const {query} = req.body
    // const {username, password} = query
    try {
      // console.log(Object.keys(req))
      // console.log(req.query);
      const {query} =  req
      const {username, password} = query 
      console.log(query);
      console.log(db.get(username, password))  
      
    } catch (e) {
      res.send('404')
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})