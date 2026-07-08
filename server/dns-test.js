const dns = require("dns");
require("dotenv").config();

dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

dns.resolveSrv(
  "_mongodb._tcp.cluster0.mtiwi06.mongodb.net",
  (err, addresses) => {
    if (err) {
      console.error("DNS ERROR:", err);
    } else {
      console.log("DNS SUCCESS:");
      console.log(addresses);
    }
  }
);