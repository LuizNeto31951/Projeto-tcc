import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { CoinsContainer, CoinsQuantity } from "./style";
import { FontAwesome5 } from "@expo/vector-icons";

export default function CoinCounter() {
    const { quantity } = useSelector((state: RootState) => state.coins);

    return (
        <CoinsContainer>
            <FontAwesome5 name="coins" size={24} color="black" />
            <CoinsQuantity>{quantity}</CoinsQuantity>
        </CoinsContainer>
    )
};