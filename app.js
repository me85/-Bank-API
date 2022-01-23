const fs = require("fs");
const users = require("./users.js");
const yargs = require("yargs");
const { number } = require("yargs");
const express = require("express");

const app = express();

// yargs.command({
//   command: "add",
//   describe: "Add a new bank user",
//   builder: {
//     id: {
//       describe: "id passport",
//       demandOption: false,
//       type: "string",
//     },
//     cash: {
//       describe: "total cash",
//       demandOption: true,
//       type: number,
//     },
//     credit: {
//       describe: "total credit ",
//       demandOption: true,
//       type: number,
//     },
//   },
//   handler: function(argv) {

//     users.addUser(argv.cash, argv.credit);
//   },
// });

// yargs.parse();

// POST method route

app.post("/users", function(req, res) {
  let credit = req.query.credit;
  let cash = req.query.cash;
  users.addUser(credit, cash);

  res.send({ credit: req.query.credit, cash: req.query.cash });
});

app.put("/users/deposite", function(req, res) {
  let cash = req.query.cash;
  let id = String(req.query.id);
  users.deposite(id, cash);
  res.send("PUT request to homepage");
});

app.put("/users/credit", function(req, res) {
  let credit = req.query.credit;
  let id = String(req.query.id);
  users.updateCredit(id, credit);
  res.send("PUT credit request to homepage");
});

app.put("/users/withdraw", function(req, res) {
  let withdraw = req.query.withdraw;
  let id = String(req.query.id);
  users.withdraw(id, withdraw);
  res.send("PUT Withdraw request to homepage");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/users/transferring", function(req, res) {
  const id = req.body.id;
  const idToTranse = req.body.idToTranse;
  const transferring = req.body.transferring;
  users.transferring(id, idToTranse, transferring);

  res.send({
    user_id: id,
    idToTranse: idToTranse,
    transferring: transferring,
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
