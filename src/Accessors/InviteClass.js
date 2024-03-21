import emailjs from "emailjs-com";
// npm install --save @emailjs/browser
// npm install emailjs-com

class inviteClass {
  constructor() {
    this.serciveID = "service_52oa4ar";
    this.templateID = "template_zpmsfte";
    this.publicKey = "yTBLZ0Orcolt_XzO_";
    emailjs.init(this.publicKey);
  }

  async sendInvite(receiver, leagueID) {
    const baseUrl = window.location.protocol + "//" + window.location.host;
    const inviteLink = baseUrl + "/" + leagueID + "/createteam";
    console.log(inviteLink);

    const inputData = {
      to_email: receiver,
      inviteLink: inviteLink,
    };

    emailjs.send(this.serciveID, this.templateID, inputData).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  }
}

export default inviteClass;
