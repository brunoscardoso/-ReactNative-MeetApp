import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex: 1;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 30, paddingRight: 30, paddingTop: 16 },
})`
  flex: 1;
  align-self: stretch;
`;

export const UnavailableIcon = styled(Icon).attrs({
  name: 'event-busy',
  size: 60,
  color: 'rgba(255, 255, 255, 0.5)',
})`
  margin-top: 80px;
`;

export const UnavailableText = styled.Text`
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin: 30px 0;
`;
