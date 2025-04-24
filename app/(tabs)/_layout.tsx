import { MaterialIcons } from "@expo/vector-icons"
import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from "expo-router";
import CoinCounter from "@/app/components/CoinCounter";

const getWeekRange = () => {
    const today = new Date();
    const day = today.getDay();
    const diffToSunday = -day;
    const diffToSaturday = 6 - day;

    const sunday = new Date(today);
    sunday.setDate(today.getDate() + diffToSunday);

    const saturday = new Date(today);
    saturday.setDate(today.getDate() + diffToSaturday);

    const format = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}/${month}`;
    };

    return `Semana: ${format(sunday)} - ${format(saturday)}`;
};

export default function TabLayout() {
    const weekRange = getWeekRange();

    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Planejador',
                    headerTitle: weekRange,
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="house" color={color} />,
                }}
            />
            <Tabs.Screen
                name="shop"
                options={{
                    title: 'Loja',
                    tabBarIcon: ({ color }) => <Entypo name="shop" size={28} color={color} />,
                    headerRight: () => <CoinCounter />,
                }}
            />
        </Tabs>
    );
}
