const functions = require("firebase-functions");

const cors = require("cors");
const express = require("express");
const jsforce = require("jsforce");
const Airtable = require("airtable");

const app = express();
var whitelist = [
  "http://localhost:3001",
  "http://localhost:3000",
  "http://localhost:80",
  "http://127.0.0.1:5001",
  "https://localhost:3000",
  "https://plus.sheeo.world",
  "https://plus.coralus.world",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());
async function airtableGetEvent(eventId) {
  let base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );
  table = base("regPages");
  let eventQuery = await table.select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 1,
    filterByFormula: "eventID='" + eventId + "'",
  });
  let eventDetails = await eventQuery.firstPage();
  if (!eventDetails || eventDetails.length === 0) {
    console.error("Error: couldn't get event details from Airtable");
  }
  return eventDetails;
}

async function salesforceCheckContactByEmail(email) {
  console.log(email);
  const creds = {
    username: process.env.SALESFORCE_USER,
    password: process.env.SALESFORCE_PW,
    url: process.env.SALESFORCE_URL,
  };
  let conn = new jsforce.Connection({
    loginUrl: creds.url,
  });
  try {
    let userIdentified = true;
    await conn.login(creds.username, creds.password);
    console.log("Connected to Salesforce!");
    // now you can use conn to read/write data...

    let escapedEmail = email.replace(/-/g, "\\-");
    console.log(escapedEmail);

    let contactData = await conn.search(
      "FIND {" + escapedEmail + "} IN Email Fields RETURNING contact"
    );

    if (
      contactData &&
      contactData.searchRecords &&
      contactData.searchRecords.length > 0
    ) {
      let contactDataDetails = await conn
        .sobject("Contact")
        .retrieve(
          contactData["searchRecords"][0]["Id"],
          function (err, contact) {
            if (err) {
              return console.error(err);
            }
            return contact;
          }
        );

      if (
        !contactDataDetails.MailingCity ||
        //!contactDataDetails.MailingState ||
        !contactDataDetails.MailingCountry ||
        !contactDataDetails["Company__c"] ||
        !contactDataDetails["In_Relationship_section_last_completed__c"]
      ) {
        userIdentified = false;
      }
    } else {
      userIdentified = false;
    }

    await conn.logout();
    console.log("User Identified: ");
    console.log(userIdentified);
    return userIdentified;
  } catch (err) {
    console.error(err);
    return false;
  }
}

app.get(
  "/salesforce/checkContactByEmail",
  cors(corsOptions),
  async (req, res) => {
    let email = req.query.email;
    const contact = await salesforceCheckContactByEmail(email).catch(() => {
      console.log("Error getting contact");
    });
    res.json(contact);
  }
);

app.get("/airtable/event", cors(corsOptions), async (req, res) => {
  let eventId = req.query.eventId;
  const eventDetails = await airtableGetEvent(eventId).catch(() => {
    console.log("Error getting event details from airtable");
  });
  res.json(eventDetails);
});

// This line exports the Express app as a single Cloud Function accessible at `/api`:
exports.api = functions.https.onRequest(app);
