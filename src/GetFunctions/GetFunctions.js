const fetch = require("node-fetch");
const { Pokemon, Type } = require('../db')

const getPokemonsAPI = async () => {
  try{ 
    const api = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=40");
    const {results} = await api.json()

    let arrPokesResp = []
    for (let i = 0; i < results.length; i++) {
      const apiResUrl = fetch(`${results[i].url}`)
      arrPokesResp.push( apiResUrl )
    }

    const pokeResultArr = await Promise.all(arrPokesResp)
    //const pokeResultArr = await Promise.all(new Error())
    
    let arrPropsPoke = []
    
    if (pokeResultArr.length) {
      for (let i = 0; i < pokeResultArr.length; i++) {
        const apiDetailsPoke = await pokeResultArr[i].json()

        const detailsPoke = {
          name: apiDetailsPoke.name,
          types: apiDetailsPoke.types.map(el => el.type.name),
        }
        arrPropsPoke.push(detailsPoke)
      }
    }

    return arrPropsPoke;
  }catch(error){
    console.log("ERROR",error);
    return []
  }
}

const getTypesAPI = async () => {
  const api = await fetch('https://pokeapi.co/api/v2/type');
  const typesRes = await api.json();
  
  if (typesRes.results.length) {
    for (let i = 0; i < typesRes.results.length; i++) {
      await Type.create(
        {name: typesRes.results[i].name,
        }
      );
    }    
  }
  return Type.findAll()
}

module.exports = {
  getTypesAPI,
  getPokemonsAPI
}