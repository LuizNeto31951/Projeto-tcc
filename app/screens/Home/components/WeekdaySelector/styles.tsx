import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  flex-direction: row;
  position: absolute;
`;

export const Button = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? "#00C853" : "#f1f1f1")};
  padding: 10px 20px;
  margin-horizontal: 2px;
  border-radius: 5px;
  align-items: center;
  width: 13%;
`;