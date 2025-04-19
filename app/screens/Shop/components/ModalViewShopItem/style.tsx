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

export const ShopItemTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  font-family: Roboto;
  margin-bottom: 12px;
  align-self: center;
`;

export const CompleteShopItem = styled.TouchableOpacity`
        width: 100%;
        height: 50px;
        margin-top: 10px;
        elevation: 1;
        border-radius: 2px;
        align-items: center;
        justify-content: center;
        background-color: #00C853;
`

export const RemoveShopItem = styled.TouchableOpacity`
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