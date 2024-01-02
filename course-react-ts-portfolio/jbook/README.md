# JBook Project

This is a lerna-based project. The application is broken up into 3 packages:

- The cli package is a command line interface app that launches an api and client package on the local machine
- The local-api package provides the ability to fetch and modify a list of cells
- The local-client package is a react-based client that allows a user to interact with javascript and markdown cells

## Running Locally

On the command line, type `npm run start`

## Publishing to npm

The jsnotenlf organization has 2FA enabled. Please see https://docs.npmjs.com/configuring-two-factor-authentication for information on how to setup an authenticator of your choice.

On the command line, type `lerna publish --otp <generated one-time password>`. Replace the generated one-time password with the password provided by your chosen authenticator.

## Running from npm

On the command line, type `npx jsnotenlf serve`.
