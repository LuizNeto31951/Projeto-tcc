import { Stack } from 'expo-router';
import Home from '../screens/Home';

export default function HomeScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Planejador' }} />
            <Home />
        </>
    );
}

