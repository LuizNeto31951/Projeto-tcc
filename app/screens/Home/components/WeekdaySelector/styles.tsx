import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 12px;
  margin-top: 10px;
`;

export const Button = styled.TouchableOpacity<{ selected: boolean }>`
  flex: 1;
  background-color: ${({ selected }) => (selected ? "#00C853" : "#ffffff")};
  padding: 10px 4px;
  margin: 0 4px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
`;

export const ButtonText = styled.Text<{ selected: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ selected }) => (selected ? "#ffffff" : "#333")};
  text-align: center;
`;
