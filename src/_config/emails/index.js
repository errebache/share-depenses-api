const nodemailer = require('nodemailer');
const sparkPostTransporter = require('nodemailer-sparkpost-transport');
const pug = require('pug');
const path = require('path'); 

class Email {
    constructor() {
        this.form = "Email projects";

        if (process.env.NODE_ENV === "production") {
            // For production pupose only
            this.transporter = nodemailer.createTransport(sparkPostTransporter({
                apiKey: process.env.SPARKPOST_API_KEY,
                endpoint: 'https://api.eu.sparkpost.com'
            }));
        } else {
            // For development purposes only
            this.transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "52d2864ed5d084",
                  pass: "b4eb2da75cdba0"
                }
              });
        }
    }

    // Method to send email verification

    async sendEmailVerification(options) {
        try {
            console.log(options);
          const protocol = options.useHttps ? 'https' : 'http'; // Determine the protocol based on the flag
          const email = {
            from: this.from,
            subject: "Email verification",
            to: options.to,
            html: pug.renderFile(
              path.join(__dirname, "templates/email-verification.pug"),
              {
                username: options.username,
                url: `${protocol}://${options.host}:3000/api/users/email-verification/${options.userId}/${options.token}`
              }
            )
          };
          const response = await this.transporter.sendMail(email);
          console.log(response);
        } catch (e) {
            console.log(e);
          throw e;
        }
    }

  async sendResetPasswordLink(options) {
    try {
      const protocol = options.useHttps ? 'https' : 'http'; // Determine the protocol based on the flag
      const email = {
        from: this.from,
        subject: "Password reset",
        to: options.to,
        html: pug.renderFile(
          path.join(__dirname, "templates/password-reset.pug"),
          {
            url: `${protocol}://${options.host}/api/users/reset-password/${options.userId}/${options.token}`
          }
        )
      };
      const response = await this.transporter.sendMail(email);
      console.log(response);
    } catch (e) {
      throw e;
    }
  }

}

module.exports = new Email();