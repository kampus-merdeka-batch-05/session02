#!/usr/bin/env node

const commander = require("commander")
const manage = require("./models/manage")

commander
  .version("v1.0.0")
  .description("World Cup Rusia 2018")

commander
  .command("refresh")
  .alias("r")
  .description("To refresh data db.json")
  .action(() => {
    manage.refreshData()
  })

commander
  .command("get-teams")
  .description("Get all teams")
  .action(() => {
    manage.getTeams()
  })

commander
  .command("get-group-name")
  .action(() => {
    manage.getMatchByGroupName(process.argv[3])
  })

// console.log(process.argv, "<< argv");

commander.parse(process.argv)