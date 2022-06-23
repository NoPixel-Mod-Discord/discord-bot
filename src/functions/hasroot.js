const { PrismaClient, UserCreateInput } = require('@prisma/client');
require("dotenv").config();
const fetch = require('node-fetch');
const HTMLParser = require('node-html-parser');
const fs = require('fs');

module.exports = {
  getStreamers: async () => {
    const prisma = new PrismaClient();
    return await prisma.streamer.findMany() // get all streamers from table
      .catch((e) => {
      throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      })
  },

  getActiveStreamers: async (days) => {
    const prisma = new PrismaClient();
    let date = new Date();
    date.setDate(date.getDate()-days); // get date X days ago

    return await prisma.streamer.findMany({
      where : { // Filter for lastonline being after date
        lastonline: {
          gte: date
        }
      }
    }).catch((e) => {
      throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      })
  },

  addStreamersFromHasroot: async () => {
    const prisma = new PrismaClient();
    const html = await fetch('https://nopixel.hasroot.com/streamers.php') // get hasroot website
      .then(res => res.text())
      .catch((err) => { console.log(err); });

    const root = HTMLParser.parse(html); 
    const streamerTags = await root.querySelectorAll('.streamerInfo'); // select all objects with .streamerInfo classes
    
    const data = [];
    streamer = {};

    streamerTags.forEach(tag => {  // get relevant info from streamerTags
      info = tag._attrs;
      streamer.id = info["data-id"];
      streamer.name = info["data-streamername"];
      streamer.lastonline = new Date(info["data-lastonline"]);
      data.push(streamer); // push to new array
    });

    const createMany = await prisma.streamer.createMany({ // Put all streamers into table
      data: data,
      skipDuplicates: true // skip if id already exists in table
    }).catch((e) => {
      throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      })
      
     return streamerTags.length + " streamers added to streamer table";
  }



}
