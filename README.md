# Fix It Now!

![stability](https://img.shields.io/badge/status-WIP-lightgrey)

This is my front-end capstone project that I created while participating in the [Nashville Software School - Full Stack Web Developer Python/Django](http://nashvillesoftwareschool.com).

The goal of this project is to build an application which helps document service outage incidents and communicate those outages to the public, as part of a robust incident management process.

One of the things I’ve faced in my career of working with various systems, is that communicating updates with all potential stakeholders (public or internal) and then maintaining a record of that communication for later analyses can be difficult (this also includes the spousal unit at home for the various technologies the family uses).  This is my attempt at creating a centralized, easy-to-update application that supports those goals.

## Screenshot
_To be added later._

## Deployed Project
_To be added later._

## Technologies Used
[![JavaScript](https://img.shields.io/badge/-JavaScript-2c9fcc?style=flat-square)](#) [![SASS](https://img.shields.io/badge/-SASS-2c9fcc?style=flat-square)](#) [![HTML](https://img.shields.io/badge/-HTML-2c9fcc?style=flat-square)](#) [![Firebase](https://img.shields.io/badge/-Firebase-2c9fcc?style=flat-square)](#) [![Axios](https://img.shields.io/badge/-Axios-2c9fcc?style=flat-square)](#) [![React](https://img.shields.io/badge/-React-2c9fcc?style=flat-square)](#)

## How to Run
This project uses webpack to compile the code.

1) Clone the project: `git clone git@github.com:nswalters/FixItNow.git`
2) Change directories to the cloned project: `cd FixItNow`
3) Use NPM to install required packages: `npm install`
4) After packages have been installed, run the local webserver using: `npm start`
5) A browser window should open pointing to `localhost:3000` (or similar depending on any other servers you might be running)

## How to Deploy
This project uses Firebase for deployment.

1) Run `firebase init` from the root of the project
2) Select `hosting`
3) Set public directory as `build`
4) Enter `yes` when asked to configure as sing-page app
5) Enter `no` if asked to overwrite
6) Run: `npm run deploy` from the root of the project directory to deploy.
7) Make sure `.firebase/` folder is in your `.gitignore` before committing.
