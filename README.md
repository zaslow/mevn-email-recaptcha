# MEVN Email Recaptcha

Built using the MEVN stack (MongoDB, Express.js, Vue.js, & Node.js), this web application allows unauthenticated users to suggest quotes via email. The owner of the email account can then set their favorite suggestion to be displayed.

## Set up & run the application

1. Clone this repo
2. Install Node v12.6.0
    - *I recommend using [Node Version Manager](https://github.com/nvm-sh/nvm)*
3. Install dependencies:
    
  `npm run install`
4. Create a `.env` file in the `server` directory and set the following properties:
    - `EMAIL_PASSWORD` - The password for your email account
    - `EMAIL_PREFIX` - (Optional) a prefix that will prepend the subject of every message for easier inbox filtering
    - `EMAIL_USERNAME` - The email/username for your email account
    - `RECAPTCHA_SECRET_KEY` - The secret key from the API key pair provided by Google
5. Sign up for a [Google reCAPTCHA API key pair](http://www.google.com/recaptcha/admin)
6. Permit application to access the email account you are using
    - [Google account - Less secure app access](https://myaccount.google.com/lesssecureapps)
7. Install & start MongoDB: [Install MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/)
    - *On macOS using Homebrew:*
      - `brew tap mongodb/brew`
      - `brew install mongodb-community@4.2`
      - `brew services start mongodb-community-4.2`
8. Start the application:
  
  `npm run start`
9. Navigate to http://localhost:8080/
