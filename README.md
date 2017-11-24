# Bubble UP

## Overview

This is a simple web application which allows the user to submit topics and upvote/downvote those topic.

**Demo**: https://bubble-up.herokuapp.com/

## Getting started

This project was bootstrapped using [Create React App](https://github.com/facebookincubator/create-react-app) and you can follow following steps to set up and build the project.

1. Clone the repo with `git clone https://github.com/tharakawj/bubble-up.git`
2. Run `yarn install` in the bubble-up folder
3. Now you can run the application in development mode with `yarn start` command or build the app for production with `yarn run build`

You can run all the tests with `yarn test` command.

(You can use same commands with `npm` as well.)

## Libraries and tools used

* React
* Redux
* React-Router
* Redux-Saga
* Create-React-App (Webpack)
* Jest
* Enzyme
* Bootstrap
* Express

## Project structure

Basic and widely used React/Redux directory structure has been used. All the smart components/pages lie in `containers` folder while presentational components are located in `components` folder. All other files are organized by their nature to different folders like `actions`, `constants`, `reducers`, `sagas`, `selectors`, etc.

Unit test files are colocated with sources files with `*.spec.js` like file names.

## Home Page

When the app starts, App component dispatch `FETCH_TOPICS_REQUEST` action and it will trigger `fetchTopics` to fetch topics from the server. Also, this action makes `loading` field `true` and the page will show the 'Loading' text. After fetching data, the saga will dispatch `FETCH_TOPICS_SUCCEEDED` to add the newly fetch topics to store in the reducer and set `loading` false. Topics are stored in the redux state by topic id so that it will be easy to find a topic by its id if required. HomePage is connected to the redux store with `getHomeTopics` selector which select 20 topics and order them by upvotes. So the topics added to the store will be displayed in Home page after `FETCH_TOPICS_SUCCEEDED` action. Assuming this app will scale in future, here we have used redux because topics are data which will be used in different views.

`VOTE_TOPICS_REQUEST` will be dispatched when user upvote or downvote a topic with `direction`. For better user experience, this will immediately and optimistically change the `upvotes` count in the state and update the UI. Also, it triggers `voteTopic` saga to update the server. If this server request fails, `upvotes` count will be reverted back to the previous value. Otherwise, nothing happens since the state is already up to date.

## New Topic Page

Since new topic form state isn't shared in any other views, local React state has been used instead of Redux state. `request.post` utility method is used to post data to the server and upon success `TOPICS_CREATED` action will be dispatched with the newly created topic. It adds the new topic to the redux store in the reducer.

For input validations, `Post` button will be disabled if the entered text is empty or its length is greater than 255.

## TODO

* Add prop-types to components
* Write test for sagas