import { all, put, call, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import { getMeetupsSuccess, subscriberSuccess } from './actions';

export function* getMeetups({ payload }) {
  const { date, page } = payload;

  try {
    const res = yield call(api.get, 'meetups', {
      params: { date, page },
    });

    if (res.data.meetups.length > 0 || page === 1) {
      const meetups = res.data.meetups.map(meetup => {
        const subscription = !!res.data.mySubscriptions.find(
          sub => sub === meetup.id
        );

        return {
          ...meetup,
          subscriber: subscription,
        };
      });

      yield put(getMeetupsSuccess(meetups, page));
    }
  } catch (err) {
    Alert.alert('Falha em carregar os meetups');
  }
}

export function* subscriber({ payload }) {
  try {
    const res = yield call(api.post, `meetups/${payload.id}/subscribe`);

    yield put(subscriberSuccess(res.data));
  } catch (err) {
    Alert.alert('Falha ao se inscrever');
  }
}

export default all([
  takeLatest('@meetups/GET_MEETUPS_REQUEST', getMeetups),
  takeLatest('@meetups/SUBSCRIBER_REQUEST', subscriber),
]);
