import React from "react";
import { Alert, Modal } from "react-native";
import { ShopItemProps } from "../../../../types/types";
import { CompleteShopItem, LabelButton, ModalContainer, RemoveShopItem, Shadow, ShopItemTitle } from "./style";
import { TouchableWithoutFeedback } from "react-native";
import { Creators as ShopItemActions } from "@/app/store/ducks/shopItems";
import { Creators as CoinsActions } from "@/app/store/ducks/coins";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";


interface ModalProps {
    ShopItem: ShopItemProps;
    show: boolean;
    setModalVisible: (visible: boolean) => void;
}

const ModalViewShopItem: React.FC<ModalProps> = ({ ShopItem, show, setModalVisible }) => {
    const dispatch = useDispatch();
    const { quantity } = useSelector((state: RootState) => state.coins);
    const coinLabel = (ShopItem?.coinCost || 0) > 1 ? " Moedas" : " Moeda";

    const handleCompleteShopItem = () => {
        if (quantity < Number(ShopItem.coinCost)) {
            Alert.alert('Não foi possivel concluir a compra!', 'Você não possui moedas o suficiente, Continue se esforçando por seus objetivos!');
        } else {
            dispatch(CoinsActions.removeCoin(ShopItem.coinCost))
        }
        setModalVisible(false);
    }

    const handleRemoveShopItem = () => {
        dispatch(ShopItemActions.removeItem(ShopItem.id))
        setModalVisible(false);
    }

    return (
        <Modal transparent={true} visible={show} animationType="slide">
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <Shadow />
            </TouchableWithoutFeedback>
            <ModalContainer>
                <ShopItemTitle>{ShopItem.title}</ShopItemTitle>
                <CompleteShopItem onPress={handleCompleteShopItem}>
                    <LabelButton>{`Comprar! ${ShopItem.coinCost ? "(-" + String(ShopItem.coinCost) + coinLabel + ")" : ""}`}</LabelButton>
                </CompleteShopItem>
                <RemoveShopItem onPress={handleRemoveShopItem}>
                    <LabelButton>Remover!</LabelButton>
                </RemoveShopItem>
            </ModalContainer>
        </Modal>
    );
};

export default ModalViewShopItem;
