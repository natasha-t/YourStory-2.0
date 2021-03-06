import getChromeID from './actions/getChromeID';
import getTimeHistoryLastFetched from './actions/getTimeHistoryLastFetched';
import getHistoryByDate from './actions/getHistoryByDate';
import postHistory from './actions/postHistory';

const userClickedAlias = () => {
  const data = {
    type: 'ADD_COUNT',
  };

  return data;
};

export default {
  // the keys in this object are the names of the action to proxy,
  // the values are the action creators that get executed
  // when the proxied action is received in the background

  'user-clicked-alias': userClickedAlias, // the action to proxy and the new action to call
  'get-chromeid': getChromeID,
  'get-time-history-last-fetched': getTimeHistoryLastFetched,
  'get-history-by-date': getHistoryByDate,
  'post-history': postHistory,
};
