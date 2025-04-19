import { ShopItemProps } from '@/app/types/types'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled(FlatList<ShopItemProps>)`
    padding: 12px;
`

export const ItemWrapper = styled.View`
    flex: 1;
    justify-content: space-between;
`