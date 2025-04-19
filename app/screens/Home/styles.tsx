import styled from "styled-components/native";
import { ToDo } from "../../types/types";
import { FlatListProps } from "react-native";

export const Container = styled.View`
flex: 1;
  background-color: #fff;
  align-items: center;
`;

export const ToDoList = styled.FlatList<FlatListProps<ToDo>>`
width: 100%;
margin-top: 20%;
  `;

export const AddButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #007BFF;
    position: absolute;
    right: 10px;
    bottom: 10px;
    justify-content: center;
    align-items: center;
`;