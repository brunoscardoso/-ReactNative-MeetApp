import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const Time = styled.View`
  flex-direction: row;
  align-items: center;

  margin: 30px 0 16px;
`;

export const DateButton = styled.TouchableOpacity`
  margin: 0 20px;
`;

export const DateText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;

export const Load = styled.ActivityIndicator.attrs({
  size: 50,
  color: '#F94D6A',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

export const ListContainer = styled.View`
  flex: 1;
  align-self: stretch;
`;
