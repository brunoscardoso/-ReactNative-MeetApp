import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  margin-top: 14px;
`;

export const Load = styled.ActivityIndicator.attrs({
  size: 60,
  color: '#F94D6A',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-bottom: 20px;
`;
