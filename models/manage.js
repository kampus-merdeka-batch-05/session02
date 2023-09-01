const moment = require("moment")

const store = require("./data")
const { generateView } = require("../views/tableView")

const refreshData = () => {
  store.refreshData()
}

const getTeams = () => {
  const tableConstructor = {
    head: ["No", "Country", "FIFA Code"],
    width: [4, 40, 30]
  }

  const teams = store.getData().teams

  // [[1, "indo", "sdas"], [2, "sg", "sdasdsa"]]
  const content = teams?.map((item, index) => {
    return [
      index + 1,
      item.name,
      item.fifaCode
    ]
  })


  generateView(tableConstructor, content, "World Cup Teams")
}

const getMatchByGroupName = (name) => {

  const tableConstructor = {
    head: ["Time", "Stadium", "Home", "Away", "Match", "Score"]
  }

  const groupData = store.getGroupDataByName(name)

  const groupMatch = []

  if (!groupData) {
    console.log("Group doesn't exist");
  } else {
    groupData[1].matches?.forEach((list) => {
      groupMatch.push([
        moment(list.date).calendar(),
        store.getStadiumByName(list.stadium),
        store.getTeamByName(list.home_team) || "-",
        store.getTeamByName(list.away_team) || "-",
        "match" + list.name,
        list.home_result + " : " + list.away_result
      ])
    })
  }

  generateView(tableConstructor, groupMatch, "GET MATCH GROUP: " + name )

}


module.exports = {
  refreshData,
  getTeams,
  getMatchByGroupName

}