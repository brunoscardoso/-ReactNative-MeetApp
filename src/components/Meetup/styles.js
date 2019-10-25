import styled, { css } from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  margin-bottom: 25px;
`;

export const Image = styled.Image`
  height: 150px;

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 20px;
  margin-bottom: 8px;
`;

export const P = styled.Text`
  font-size: 13px;
  color: #999;
  margin: 3px 20px;
`;

export const SubmitButton = styled(Button)`
  height: 40px;
  margin: 20px;

  ${({ subscriber }) =>
    subscriber &&
    css`
      background: #4dbaf9;
    `}

  ${({ past }) =>
    past &&
    css`
      background: #333;
    `}
`;
