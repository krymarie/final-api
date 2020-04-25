import { Client } from "../models/client.js";

// Get Clients
export const getAllClients = (req, res, next) => {
  Client.find()
    .then((clients) => {
      res.json(clients);
    })
    .catch((err) => console.log(err));
};

// pull one client by ID hjg
export const getCLientById = (req, res, next) => {
  const clientID = req.params;
  Client.findById(clientID.id)
    .then((client) => {
      if (!client) {
        return res.redirect("/");
      }
      res.json(client);
    })
    .catch((err) => console.log(err));
};

// create
export const postAddClient = (req, res, next) => {
  const client = new Client({
    name: req.query.name,
    status: req.query.status,
    address: req.query.address,
    phone: req.query.phone,
    interestLevel: req.query.interestLevel,
  });
  client
    .save()
    .then((result) => {
      res.send("Added New Client!");
    })
    .catch((err) => console.log(err));
};

// here you can update an existing client
export const postEditClient = (req, res, next) => {
  const clientID = req.query.id;
  const updatedName = req.query.name;
  const updatedStatus = req.query.status
  const updatedAddress = req.query.address
  const updatedPhone = req.query.phone
  const updatedInterestLevel = req.query.interestLevel

  Client.findById(clientID)
    .then((client) => {
      client.name = updatedName
      client.status = updatedStatus
      client.address = updatedAddress
      client.phone = updatedPhone
      client.interestLevel = updatedInterestLevel
      return client.save();
    })
    .then((result) => {
      res.redirect("/admin/getAllClients");
    })
    .catch((err) => console.log(err));
};

// rarely used but just in case a client hates you and no longer wants you to ever contact them ever adain
export const postDeleteClient = (req, res, next) => {
  const clientID = req.query.id;
  Client.findByIdAndRemove(clientID)
    .then(() => {
      res.redirect("/admin/getAllClients");
    })
    .catch((err) => console.log(err));
};
