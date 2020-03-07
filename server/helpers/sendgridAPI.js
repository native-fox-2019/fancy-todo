const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  sendgrid(inputData, email) {
    const msg = {
      to: `${email}`,
      from: "noreply.todolistapp@mail.com",
      subject: "You've created a todo list !",
      html: `
            Congratulations you've created a todo list ! </br>
            </br>
            </br>
            Don't Forget you have a deadline to finish your task. </br>
            Here is your todo list : </br>
            </br>
            TITLE : </br>
            ${inputData.title} </br>
            DESCRIPTION : </br>
            ${inputData.description} </br>
            STATUS : </br>
             ${inputData.status} </br>
            DEADLINE :  </br>
            ${inputData.due_date} </br>
            </br>
            </br>
            <strong>TODO APPS BY DARINDRA R</strong>`
    };
    return sgMail.send(msg);
  }
};
