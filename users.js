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

const deposite = function(id, cash) {
  let users = loadUsers();
  console.log("cash", cash);
  console.log(id);
  users.forEach((user) => {
    if (user.id === id) {
      user.cash += parseInt(cash);
      console.log(parseInt(user.cash));
    }
  });
  saveUsers(users);
  console.log("deposite transction");
};

const updateCredit = function(id, credit) {
  let users = loadUsers();
  console.log("cash", credit);
  console.log(id);
  users.forEach((user) => {
    if (user.id === id) {
      user.credit += parseInt(credit);
      console.log(parseInt(user.credit));
    }
  });
  saveUsers(users);
  console.log("deposite transction");
};

const withdraw = function(id, withdraw) {
  let users = loadUsers();
  console.log("withdraw", withdraw);
  console.log(id);
  users.forEach((user) => {
    if (user.id === id) {
      if (user.credit > 0) {
        user.credit -= parseInt(withdraw);
      } else if (user.cash > 0) {
        user.cash -= parseInt(withdraw);
      } else {
        console.error("run out of money");
      }
    }
  });
  saveUsers(users);
  console.log("deposite transction");
};

const transferring = function(id, idToTranse, transferring) {
  let users = loadUsers();
  console.log("transferring", transferring);
  console.log(id);
  users.forEach((user) => {
    if (user.id === id) {
      if (user.credit > 0) {
        user.credit -= parseInt(transferring);

        users.forEach((user1) => {
          console.log("each");
          if (user1.id === idToTranse) {
            user1.credit += parseInt(transferring);
          }
        });
        return;
      } else if (user.cash > 0) {
        user.cash -= parseInt(transferring);

        users.forEach((user1) => {
          console.log("each2");

          if (user1.id === idToTranse) {
            user1.credit += parseInt(transferring);
          }
        });
        return;
      } else {
        console.error("run out of money");
        return;
      }
    }
  });

  saveUsers(users);
  console.log("deposite transction");
};

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

module.exports = {
  getUsers: getUsers,
  addUser: addUser,
  deposite: deposite,
  updateCredit: updateCredit,
  withdraw: withdraw,
  transferring: transferring,
};
