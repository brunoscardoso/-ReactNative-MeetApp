import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';

import { subDays, addDays } from 'date-fns';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';
import MeetupsList from '~/components/MeetupsList';
import DateInput from '~/components/DateInput';

import { getMeetupsRequest } from '~/store/modules/meetups/actions';

import { Container, Time, DateButton, Load, ListContainer } from './styles';

let initialX = 0;

export default function Dashboard({ navigation }) {
  const [date, setDate] = useState(addDays(new Date(), 0));
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const meetups = useSelector(state => state.meetups.meetups);
  const page = useSelector(state => state.meetups.page);

  useEffect(() => {
    async function load() {
      setLoading(true);
      dispatch(getMeetupsRequest(date, 1));
      setLoading(false);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function handleRefresh() {
    setRefreshing(true);
    dispatch(getMeetupsRequest(date, 1));
    setRefreshing(false);
  }

  function loadMore() {
    dispatch(getMeetupsRequest(date, page + 1));
  }

  return (
    <Background>
      <Header />
      <Container>
        <Time>
          <DateButton onPress={handlePrevDay}>
            <Icon name="chevron-left" size={35} color="#fff" />
          </DateButton>
          <DateInput date={date} onChange={setDate} />
          <DateButton onPress={handleNextDay}>
            <Icon name="chevron-right" size={35} color="#fff" />
          </DateButton>
        </Time>
        {loading ? (
          <Load />
        ) : (
          <FlingGestureHandler
            direction={Directions.LEFT + Directions.RIGHT}
            onHandlerStateChange={({ nativeEvent }) => {
              const { state, absoluteX } = nativeEvent;

              if (state === State.BEGAN) {
                initialX = absoluteX;
              } else if (state === State.END) {
                if (absoluteX - initialX < 0) handleNextDay();
                else handlePrevDay();

                initialX = 0;
              }
            }}
          >
            <ListContainer>
              <MeetupsList
                data={meetups}
                navigation={navigation}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                onEndReached={loadMore}
                onEndReachedThreshold={0.2}
              />
            </ListContainer>
          </FlingGestureHandler>
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
