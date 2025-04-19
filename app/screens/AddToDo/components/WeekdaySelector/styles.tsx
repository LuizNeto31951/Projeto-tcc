import styled from "styled-components/native";

export const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
`;

export const DayButton = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 8px 12px;
  background-color: ${({ selected }) => (selected ? "#00C853" : "#ccc")};
  border-radius: 16px;
`;

export const DayText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-family: Roboto;
`;
