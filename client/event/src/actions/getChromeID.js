'use strict';

import axios from 'axios';
import getWeekData from './getWeekData';
import { finalHistory } from './postHistory';
import getCatData from './getCatData';


const finalGetChromeID = (chromeID) => {
  const data = {
    type: 'GET_CHROMEID',
    payload: chromeID,
  };

  return data;
};

export default function getChromeID() {
  return function (dispatch) {
    chrome.identity.getAuthToken({
      interactive: true,
    }, (token) => {
      if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
        return;
      }

      const x = new XMLHttpRequest();
      x.open('GET', 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token);
      x.onload = function () {
        const userInfo = JSON.parse(x.response);
        console.log('User info from chrome: ', userInfo);
        axios({
          method: 'post',
          url: 'http://localhost:3000/api/users', // 'http://yourstory-app.herokuapp.com/api/history'
          data: { chromeID: userInfo.id, username: userInfo.name },
        })
          .then((response) => {
            console.log('response: ', response);
            const chromeID = JSON.parse(response.config.data).chromeID;
            dispatch(finalGetChromeID(chromeID));
            //record store's time state
            //store dispatches individual actions to post history and fetch data

            let oneWeekAgo = new Date();

            chrome.history.search({
            'text': '', // Return every history item....
            'startTime': oneWeekAgo.setDate(oneWeekAgo.getDate() - 7), // need to subtract now from timeHistoryLastFetched 
            }, (chromeHistoryArray) => {
              console.log('CHROME HISTORY', chromeHistoryArray);
              axios({
                method: 'post',
                url: 'http://localhost:3000/api/history',
                data: { history: chromeHistoryArray },
              }).then((response) => {
                dispatch(getWeekData());
                dispatch(finalHistory(response.data));
                dispatch(getCatData());
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      };
      x.send();
    });
  };
}
