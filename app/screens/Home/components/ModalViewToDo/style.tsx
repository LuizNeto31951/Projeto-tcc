import { TouchableWithoutFeedback } from "react-native";
import { type TextProps } from "react-native";
import styled from "styled-components/native";

export const Shadow = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
`

export const ModalContainer = styled.View`
    width: 100%;
    background-color: white;
    padding: 12px;
`

export const ToDoTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  font-family: "Roboto";
`;

export const ToDoDescription = styled.Text`
  font-size: 14px;
  color: #333;
  font-family: "Roboto";
`;

export const ToDoDate = styled.Text`
  font-size: 14px;
  color: #333;
  font-family: "Roboto";
`;

type ToDoCompletedType = TextProps & {
    completed: boolean;
}
export const ToDoCompleted = styled.Text<ToDoCompletedType>`
  font-size: 14px;
  color: ${({ completed }) => completed ? "green" : "red"};
  font-family: "Roboto";
`

export const CompleteTodo = styled.TouchableOpacity`
        width: 100%;
        height: 50px;
        margin-top: 10px;
        elevation: 1;
        border-radius: 2px;
        align-items: center;
        justify-content: center;
        background-color: #00C853;
`

export const RemoveTodo = styled.TouchableOpacity`
        width: 100%;
        height: 50px;
        margin-top: 10px;
        elevation: 1;
        border-radius: 2px;
        align-items: center;
        justify-content: center;
        background-color: red;
`

export const LabelButton = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: white;
  font-family: "Roboto";
`