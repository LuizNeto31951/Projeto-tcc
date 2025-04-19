import { MaterialIcons } from "@expo/vector-icons"
import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from "expo-router";
import CoinCounter from "@/app/components/CoinCounter";

export default function TabLayout() {

    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Planejador',
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="house" color={color} />,
                }}
            />
            <Tabs.Screen
                name="shop"
                options={{
                    title: 'Loja',
                    tabBarIcon: ({ color }) => <Entypo name="shop" size={28} color={color} />,
                    headerRight: () => { return (<CoinCounter />) },
                }}
            />
        </Tabs>
    );
}