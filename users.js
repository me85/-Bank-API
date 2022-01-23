const fs = require("fs");

var uniqid = require("uniqid");

const addUser = function(credit, cash) {
  let users = loadUsers();
  users.push({
    id: uniqid(),
    credit: credit,
    cash: cash,
  });
  saveUsers(users);
  console.log("New bank user added!");
};

const deposite = function(cash, id) {
  let users = loadUsers();

  users.forEach((user) => {
    if (user.id === id) {
      user.cash = +cash;
      console.log(user.cash);
    }
    saveUsers(users);
    console.log("deposite transction");
  });

  const getUsers = function() {
    return "Your users...";
  };

  const saveUsers = function(user) {
    const dataJSON = JSON.stringify(user);
    fs.writeFileSync("bankUsersDb.json", dataJSON);
  };

  const loadUsers = function() {
    try {
      const dataBuffer = fs.readFileSync("bankUsersDb.json");
      const dataJSON = dataBuffer.toString();
      return JSON.parse(dataJSON);
    } catch (e) {
      return [];
    }
  };

  module.exports = { getUsers: getUsers, addUser: addUser, deposite: deposite };
};
