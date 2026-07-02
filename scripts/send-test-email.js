import { Resend } from 'resend';

// IMPORTANT: Replace 're_xxxxxxxxx' with your actual Resend API Key
const apiKey = 're_bsZ8u2Bk_F4RSB3SCcw5oHHB7kHkadWLy';

const resend = new Resend(apiKey);

console.log("Initiating test email transmission...");

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'aiwassstudio@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
})
  .then((response) => {
    if (response.error) {
      console.error("Error sending email:", response.error.message);
    } else {
      console.log("Email sent successfully!");
      console.log("Response Data:", response.data);
    }
  })
  .catch((error) => {
    console.error("Unexpected transmission error:", error);
  });
