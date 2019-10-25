import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Background from '~/components/Background';
import Header from '~/components/Header';
import MeetupsList from '~/components/MeetupsList';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Load, Title } from './styles';
import { getSubscriptionsRequest } from '~/store/modules/subscriptions/actions';

export default function Subscriptions({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const meetups = useSelector(state => state.subscriptions.subscriptions);
  const page = useSelector(state => state.subscriptions.page);

  useEffect(() => {
    setLoading(true);
    dispatch(getSubscriptionsRequest(1));
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleRefresh() {
    setRefreshing(true);
    dispatch(getSubscriptionsRequest(1));
    setRefreshing(false);
  }

  function loadMore() {
    dispatch(getSubscriptionsRequest(page + 1));
  }

  return (
    <Background>
      <Header />
      <Container>
        <Title>Meetups Inscritos</Title>
        {loading ? (
          <Load />
        ) : (
          <MeetupsList
            subscription
            data={meetups}
            navigation={navigation}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReached={loadMore}
            onEndReachedThreshold={0.2}
            unavailableMsg={'Você não está inscrito em eventos'}
          />
        )}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event-available" size={20} color={tintColor} />
  ),
};

Subscriptions.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
