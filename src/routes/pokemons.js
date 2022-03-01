const { server } = require('express')
const { getPokemonsAPI} = require('../GetFunctions/GetFunctions')

const server = server();

server.get("/", async (req, res) => {
  const infoAPI = await getPokemonsAPI()
  if (infoAPI.length) {    
    return res.json(infoAPI)
  }else{
    res.status(404).json({msg:"Errror de conexión"})
  }
})

module.exports = server;