import React from 'react';
import ShopItem from './components/ShopItem';
import ShopSkeleton from './components/ShopSkeleton';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import { Container, ItemWrapper } from './style';
import { ShopItemProps } from '@/app/types/types';

export default function ShopScreen() {
    const { items } = useSelector((state: RootState) => state.shopItems);

    return (
        <Container
            data={items}
            keyExtractor={(item: ShopItemProps, index) => `${item.title}-${index}`}
            numColumns={2}
            renderItem={({ item }: { item: ShopItemProps }) => (
                <ItemWrapper>
                    {(item?.isSkeleton) ? <ShopSkeleton /> : <ShopItem {...item} />}
                </ItemWrapper>
            )}
        />
    );
}