import { Stack } from 'expo-router';
import Shop from '../screens/Shop';

export default function HomeScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Loja' }} />
            <Shop />
        </>
    );
}

