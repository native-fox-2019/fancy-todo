const mailjet = require ('node-mailjet')
.connect('9307dd5a4cc74ae36ae69a7bc4d6b9ce', '137b2bfc2bbeb1c972e627a2d57c99e6')
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "rqz.agastya@gmail.com",
        "Name": "Gusti"
      },
      "To": [
        {
          "Email": "gustiagung.surel@gmail.com",
          "Name": "Gusti"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err)
  })
