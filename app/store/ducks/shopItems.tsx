import { createActions, createReducer } from 'reduxsauce';
import { ShopItemProps as ShopItem } from '@/app/types/types';

interface ShopState {
    items: ShopItem[];
}

const initialState: ShopState = {
    items: [{ id: '0', isSkeleton: true }],
};

const ensureSkeletonLast = (items: ShopItem[]): ShopItem[] => {
    const filtered = items.filter(item => item.id !== '0');
    return [...filtered, { id: '0', isSkeleton: true }];
};

type AddItemAction = {
    type: string;
    item: ShopItem;
};

type RemoveItemAction = {
    type: string;
    id: string;
};

type UpdateItemAction = {
    type: string;
    item: ShopItem;
};

const addItem = (state: ShopState, action: AddItemAction): ShopState => ({
    ...state,
    items: ensureSkeletonLast([...state.items, action.item]),
});

const removeItem = (state: ShopState, action: RemoveItemAction): ShopState => ({
    ...state,
    items: ensureSkeletonLast(state.items.filter(item => item.id !== action.id)),
});

const updateItem = (state: ShopState, action: UpdateItemAction): ShopState => ({
    ...state,
    items: ensureSkeletonLast(
        state.items.map(item =>
            item.id === action.item.id ? { ...item, ...action.item } : item
        )
    ),
});

export const { Types, Creators } = createActions({
    addItem: ['item'],
    removeItem: ['id'],
    updateItem: ['item'],
});

const HANDLERS = {
    [Types.ADD_ITEM]: addItem,
    [Types.REMOVE_ITEM]: removeItem,
    [Types.UPDATE_ITEM]: updateItem,
};

export default createReducer<ShopState>(initialState, HANDLERS);
