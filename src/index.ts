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
6. When an order is placed, you should email the user a receipt. You should integrate 
with the sandbox of Mailgun.com for this. Note: Every Mailgun account comes with a sandbox email 
account domain (whatever@sandbox123.mailgun.org) that you can send from by default. So, there's no need 
to setup any DNS for your domain for this task 
https://documentation.mailgun.com/en/latest/faqs.html#how-do-i-pick-a-domain-name-for-my-mailgun-account
 */