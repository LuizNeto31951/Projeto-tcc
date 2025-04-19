import styled from "styled-components/native"

interface ItemContainerProps {
        isSolo: boolean;
}

export const ItemContainer = styled.TouchableOpacity<ItemContainerProps>`
        height: 230px;
        width: ${({ isSolo }) => isSolo ? '45' : '90'}%;
        background-color: #F3F4F6;
        border-width: 1px;
        border-color: "#DBEAFE";
        border-radius: 12px;
        padding: 12px;
        margin: 8px;
        align-items: center;
        justify-content: center;
        elevation: 3;
`

export const AddIcon = styled.View`
        justify-content: center;
        align-items: center;
`
