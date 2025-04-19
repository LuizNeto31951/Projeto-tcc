import React from 'react';
import { Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RelativePathString, router } from 'expo-router';
import { AddIcon, ItemContainer } from './style';

export default function ShopSkeleton() {

    const handleOnPress = () => {
        router.navigate('screens/AddShopItem' as RelativePathString);
    };

    return (
        <ItemContainer onPress={handleOnPress}>
            <AddIcon>
                <Ionicons name="add-circle-outline" size={42} color="#10B981" />
                <Text>Adicionar!</Text>
            </AddIcon>
        </ItemContainer>
    );
}
