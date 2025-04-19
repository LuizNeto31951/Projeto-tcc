import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ShopItemProps } from '@/app/types/types';
import {
    ItemContainer,
    EditArea,
    ImagePlaceholder,
    StyledImage,
    TextArea,
    Title,
    CoinArea,
    Coin
} from './styles';
import { router } from 'expo-router';
import ModalViewShopItem from '../ModalViewShopItem';

export default function ShopItem({ id, title, coinCost, imageSource }: ShopItemProps) {
    const [showModal, setShowModal] = useState(false);

    const handleOnPress = () => {
        setShowModal(true);
    };

    const handleEditOnPress = () => {
        router.navigate({
            pathname: '/screens/AddShopItem',
            params: {
                idEdit: id, titleEdit: title, coinCostEdit: coinCost, imageSourceEdit: imageSource.uri
            },
        });
    };

    return (
        <>
            <ItemContainer onPress={handleOnPress}>
                <EditArea onPress={handleEditOnPress}>
                    <MaterialIcons name="edit" size={18} color="white" />
                </EditArea>

                <ImagePlaceholder>
                    {imageSource ? (
                        <StyledImage source={imageSource} resizeMode="stretch" />
                    ) : (
                        <StyledImage source={require('@/app/assets/images/default.jpg')} resizeMode="stretch" />
                    )}
                </ImagePlaceholder>

                <TextArea>
                    <Title numberOfLines={2}>{title}</Title>
                </TextArea>

                <CoinArea>
                    <FontAwesome5 name="coins" size={18} color="#FACC15" />
                    <Coin>{coinCost}</Coin>
                </CoinArea>
            </ItemContainer>
            <ModalViewShopItem ShopItem={{
                id: id,
                title: title,
                coinCost: coinCost,
                imageSource: imageSource,
            }} show={showModal} setModalVisible={setShowModal} />
        </>
    );
}
