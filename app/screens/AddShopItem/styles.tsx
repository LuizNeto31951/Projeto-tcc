import styled from "styled-components/native";

export const Container = styled.View`
    padding: 16px;
`

export const Label = styled.Text`
        font-size: 16px;
        font-weight: bold;
        margin-top: 8px;
        font-family: Roboto;
`

export const ErrorText = styled.Text`
        font-family: Roboto;
        color: red;
        fontSize: 12px;
`
export const Input = styled.TextInput`
        border-width: 1px;
        border-color: #ccc;
        padding: 8px;
        border-radius: 4px;
        margin-top: 4px;
`

export const AddButton = styled.TouchableOpacity`
        width: 100%;
        height: 50px;
        margin-top: 10px;
        elevation: 1;
        border-radius: 2px;
        align-items: center;
        justify-content: center;
        background-color: #00C853;
`

export const ButtonText = styled.Text`
        font-size: 16px;
        font-weight: bold;
        font-family: Roboto;
        color: #F0F0F0;
`

export const ImagePreview = styled.Image`
  width: 60%;
  height: 180px;
  align-self:center;
  margin-top: 12px;
  border-radius: 12px;
  margin-bottom: 16px;
`;
