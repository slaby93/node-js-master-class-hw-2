import Server from './server'
import config from './config'

// Main entry
const app = {
  initialize: () => {
    new Server()
      .start(config.PORT)
  }
}

app.initialize()

/**
5. A logged-in user should be able to create an order. You should integrate with the 
Sandbox of Stripe.com to accept their payment. Note: Use the stripe sandbox for your testing. 
Follow this link and click on the "tokens" tab to see the fake tokens you can use server-side to 
confirm the integration is working: https://stripe.com/docs/testing#cards

6. When an order is placed, you should email the user a receipt. You should integrate 
with the sandbox of Mailgun.com for this. Note: Every Mailgun account comes with a sandbox email 
account domain (whatever@sandbox123.mailgun.org) that you can send from by default. So, there's no need 
to setup any DNS for your domain for this task 
https://documentation.mailgun.com/en/latest/faqs.html#how-do-i-pick-a-domain-name-for-my-mailgun-account
 */