import React from 'react';
import ShopItem from './components/ShopItem';
import ShopSkeleton from './components/ShopSkeleton';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import { Container, ItemWrapper } from './style';
import { ShopItemProps } from '@/app/types/types';
import { ListRenderItemInfo } from 'react-native';

export default function ShopScreen() {
    const { items } = useSelector((state: RootState) => state.shopItems);

    const renderItem = ({ item }: ListRenderItemInfo<ShopItemProps>) => (
        <ItemWrapper>
            {item?.isSkeleton
                ? <ShopSkeleton isSolo={items.length % 2 !== 0} />
                : <ShopItem {...item} />}
        </ItemWrapper>
    );

    return (
        <Container
            data={items}
            keyExtractor={(item, index) => `${item.title}-${index}`}
            numColumns={2}
            renderItem={renderItem}
        />
    );
}
