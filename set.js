const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Gifted;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUoxT3lWWlFVYUtHQkFDNWkvaXBMb2x0M2Ewdmg2WVdhZlRMSHN6dloycz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSzY4TnM1bkFYaGl5M2dJTWpQd3A1eHIxMGQyL0tjZWFJUmVEdmJTL0dnbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpSlRnazlsN0FBOTdoWHl1eDB6V2psaUh0UmMzMjlCNzZGejBRcEF0TlVBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJodDRvRkN1N1RnY0pFMWh5bWQrbTlDdFIyeVRtRUlSUGRINS8vYjdzMmlRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZJaFpFNlZaZDBnVlA3cWk1eEVySjJRR2dsK0ZqaWdJVlBBV1l1M2pGMG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5iZGthUWtuamI4ZC9MQWhkM0lqMmNhbldhVnA3UDJkTXcrRHkxME5ERW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEZmUWRKVndrWVZDblVBeTJxMEp3VVRMOW8vTXh4QW9zYnFFd0FlUWUzWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUxhd25yWHV0bFl6VmdsMnFCcG9jTTVYc2w1SjJmZk9CTFh2QVdwdFgzMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ims4aTU3bFFpMnhrRjdKUE1ROUVzNUhPNm5MNjRxWloxeFZNK0pnUHI3c1FXdlZEK1FCeSswMTNOd1ZuZFdYK1RVekN4YUxpYU11SkVYcUx5ZFI5RWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIzLCJhZHZTZWNyZXRLZXkiOiJ5SU1nNFFHSXdzMHV5ZGJ2MkR0MHhuTUcvbHB0K3dlM0syV05GOUMxK0RZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIyNTk1NTY2OTAwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjA1OTlFRTdFNjI0Q0MzMjIxNEVCQjE3ODRCMjIyNTFBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTg4MjQyMTN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InA1RFQwRURaVEQtMDhBS0RQNjQ0X2ciLCJwaG9uZUlkIjoiNGUwMTE1NzUtOTZhYy00M2MzLTk3NTUtYzBlZGE5ZDFlZDQ0IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Img5RWN6SlV0akNRWmMzcVZqZ1J1dVJnT0w4dz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0Y3c1SGxsam5ITTRkd3lEOXo4TUxMczZ4dkU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQTRDN1A2UksiLCJtZSI6eyJpZCI6IjIyNTk1NTY2OTAwOjlAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ055TXVOZ0NFSVhhekxNR0dBWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InkyTGZERXMxNDBJSTVLeFB6VzN0dUtCSWY1cUNjRWV1eXZob2MyRm81SG89IiwiYWNjb3VudFNpZ25hdHVyZSI6IjRPQmE4TWdMTncwQnBwdm5sUnowcVlmd2RoZCsrek5aRlZnanBLTFlvalQwSFZCMlNUT2dIL2Z2TjA4NEFIUGdzbzZZcndrcFlZVWsvSitSNG1VT0FnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIycXVESCtQZWZFNHF0b2REYmtrYkh6ZDNuMER4L3dxb1NLOUVodmF4YmdlVFpMOHJUWnM3TVFhbG83YVY3cFRLdVhSQWcvSytyZkY1OC8yVnBsNlJndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIyNTk1NTY2OTAwOjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY3RpM3d4TE5lTkNDT1NzVDgxdDdiaWdTSCthZ25CSHJzcjRhSE5oYU9SNiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxODgyNDIxMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMQ0EifQ==',
    PREFIXE: process.env.PREFIX || ".","§"
    OWNER_NAME: process.env.OWNER_NAME || "𝑴𝒐𝒐𝒏𝑳𝒊𝒈𝒉𝒕🖤",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2250595566900,22389520946", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'ɢɪғᴛᴇᴅ-ᴍᴅ',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/a202f454c9532c3f5b7f8.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

