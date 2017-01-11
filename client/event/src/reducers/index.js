import React from 'react';
import { combineReducers } from 'redux';

import count from './count';
import token from './token';
import chromeID from './chromeID';

export default combineReducers({
  count,
  token,
  chromeID,
});

