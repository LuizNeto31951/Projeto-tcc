import styled from 'styled-components/native';

export const ItemContainer = styled.TouchableOpacity`
    height: 230px;
    width: 90%;
    background-color: #fff;
    border-radius: 12px;
    padding: 12px;
    margin: 8px;
    flex: 1;
    align-items: center;
    justify-content: center;
    elevation: 3;
`;

export const EditArea = styled.TouchableOpacity`
    height: 30px;
    width: 30px;
    position: absolute;
    right: 8px;
    top: 8px;
    z-index: 10;
    border-radius: 15px;
    background-color: #3B82F6;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-color: #2563EB;
    elevation: 1;
`;

export const ImagePlaceholder = styled.View`
    width: 140px;
    height: 120px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    overflow: hidden;
`;

export const StyledImage = styled.Image`
    width: 100%;
    height: 100%;
`;

export const ImageText = styled.Text`
    color: #aaa;
    font-size: 12px;
`;

export const TextArea = styled.View`
    height: 40px;
`;

export const Title = styled.Text`
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    margin-bottom: 4px;
`;

export const CoinArea = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Coin = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin-left: 12px;
`;
