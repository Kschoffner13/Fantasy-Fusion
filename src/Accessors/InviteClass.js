// import emailjs from "emailjs-com";
// npm install --save @emailjs/browser
// npm install emailjs-com

// class inviteClass {
//     constructor() {
//         this.serciveID = "service_52oa4ar";
//         this.templateID = "template_zpmsfte";
//         this.publicKey = "yTBLZ0Orcolt_XzO_";
//         emailjs.init(this.publicKey);
//     }

//     async sendInvite(receiver, leagueID) {
//         const baseUrl = window.location.protocol + "//" + window.location.host;
//         const inviteLink = baseUrl + "/#/" + leagueID + "/createteam";
//         console.log(inviteLink);

//         const inputData = {
//             to_email: receiver,
//             inviteLink: inviteLink,
//         };

//         emailjs.send(this.serciveID, this.templateID, inputData).then(
//             function (response) {
//                 console.log("SUCCESS!", response.status, response.text);
//             },
//             function (error) {
//                 console.log("FAILED...", error);
//             }
//         );
//     }
// }

const aws = require("aws-sdk");
require("dotenv").config();

const ses_congig = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: "ca-central-1",
};

class inviteClass {
  constructor() {
    this.ses = new aws.SES(ses_congig);
  }

  async sendInvite(receiver, leagueID) {
    const baseUrl = window.location.protocol + "//" + window.location.host;
    const inviteLink = baseUrl + "/#/" + leagueID + "/createteam";

    const params = {
      Destination: {
        ToAddresses: [receiver],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `<a href=${inviteLink}>Click here to join the league</a>`,
          },
          Text: {
            Charset: "UTF-8",
            Data: `Click here to join the league: ${inviteLink}`,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Join the league",
        },
      },
      Source: "FantasyFusionDoNotReply@gmail.com",
    };

    try {
      const r = await this.ses.sendEmail(params).promise();
      console.log("Invite sent");
    } catch (e) {
      console.log(e);
    }
  }
}
export default inviteClass;
