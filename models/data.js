const fs = require("fs")
const axios = require("axios")
const db = __dirname + "/../store/db.json"


// get data from third party API and save to db.json
const refreshData = () => {
  axios.get("https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json")
  .then(res => {
    fs.writeFileSync(db, JSON.stringify(res.data, null, 2), "utf8")
    console.log("Success refresh data");
  }).catch(err => {
    console.log(err.message, "<< error refresh data");
  })
}

// get all data from db.json
const getData = () => {
  const data = fs.readFileSync(db, "utf8")

  return JSON.parse(data)
}

const getGroupDataByName = (name) => {
  const groups = Object.entries(getData().groups)

  return groups.find(([key, value]) => key === name)
}


const getStadiumById = (id) => {
  const data = getData().stadiums

  return data.find(item => item.id === id)
}

const getStadiumByName = (id) => {
  const data = getStadiumById(id)

  if (!data) return null

  return data.name
}

const getTeamById = (id) => {
  const data = getData().teams

  return data.find(item => item.id === id)
}

const getTeamByName = (id) => {
  const data = getTeamById(id)

  if (!data) return null

  return data.fifaCode
}

module.exports = {
  refreshData,
  getData,
  getGroupDataByName,
  getTeamByName,
  getStadiumByName
}