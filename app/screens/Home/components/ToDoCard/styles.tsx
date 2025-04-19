import { type TextProps } from "react-native";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    height: 100px;
    width: 90%;
    border-radius: 10px;
  background-color: #fff;
  margin-top: 10px;
  elevation: 3;
  padding: 7px;
  align-self: center;
`;

export const ToDoTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  font-family: Roboto;
`;

export const ToDoDescription = styled.Text`
  font-size: 14px;
  color: #333;
  font-family: Roboto;
`;

export const TimeText = styled.Text`
    font-size: 14px;
    color: #555;
    margin: 4px 0;
    font-family: Roboto;
`;

type ToDoCompletedType = TextProps & {
  completed: boolean;
}
export const ToDoCompleted = styled.Text<ToDoCompletedType>`
  font-size: 14px;
  color: ${({ completed }) => completed ? "green" : "red"};
  font-family: Roboto;
`

export const CoinsContainer = styled.View`
  position: absolute;
  right: 12px;
  top: 12px;
  flex-direction: row;
`

export const CoinsQuantity = styled.Text`
  font-size: 16px;
  font-family: Roboto;
  margin-left: 12px;
`
