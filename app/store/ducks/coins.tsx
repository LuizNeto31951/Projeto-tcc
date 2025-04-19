import { createActions, createReducer } from 'reduxsauce';

interface CoinState {
    quantity: number;
}

const initialState: CoinState = {
    quantity: 0,
};

type AddCoinAction = {
    type: string;
    quantity: number;
};

type RemoveCoinAction = {
    type: string;
    quantity: number;
};


const addCoin = (state: CoinState, action: AddCoinAction): CoinState => {
    return {
        ...state,
        quantity: state.quantity + Number(action.quantity),
    };
};

const removeCoin = (state: CoinState, action: RemoveCoinAction): CoinState => {
    const stateQuantity = Number(state.quantity);
    const actionQuantity = Number(action.quantity);
    const negativeCoins = stateQuantity - actionQuantity < 0;
    const totalCoins = negativeCoins ? 0 : stateQuantity - actionQuantity
    return {
        ...state,
        quantity: totalCoins,
    }
}

export const { Types, Creators } = createActions({
    addCoin: ['quantity'],
    removeCoin: ['quantity'],
});

const HANDLERS = {
    [Types.ADD_COIN]: addCoin,
    [Types.REMOVE_COIN]: removeCoin,
} as const;

export default createReducer<CoinState>(initialState, HANDLERS);