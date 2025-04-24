import React, { useEffect, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { AddButton, Container, ToDoList } from "./styles";
import ToDoCard from './components/ToDoCard';
import { ToDo } from '../../types/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { Creators as daySelectorActions } from '@/app/store/ducks/daySelector';
import { Creators as toDoActions } from '@/app/store/ducks/toDos';
import WeekdaySelector from './components/WeekdaySelector';
import { RelativePathString, router } from 'expo-router';
import { View } from "react-native";
import { Text } from "react-native";
import { isOneWeekPassed, timeToMinutes } from "@/app/utils/functions";

export default function Home() {
    const dispatch = useDispatch();
    const { toDos, lastResetDate } = useSelector((state: RootState) => state.toDos);
    const { selectedDay } = useSelector((state: RootState) => state.daySelector);

    useEffect(() => {
        const today = new Date().toISOString();

        if (!lastResetDate) {
            dispatch(toDoActions.setLastResetDate(today));
        } else if (isOneWeekPassed(lastResetDate)) {
            dispatch(toDoActions.resetAllToDos());
            dispatch(toDoActions.setLastResetDate(today));
        }
    }, [lastResetDate]);


    const filteredToDos = toDos ? toDos.filter((todo) => todo.days.includes(selectedDay)).sort((a, b) => timeToMinutes(a.startTime || "00:00") - timeToMinutes(b.startTime || "00:00")) : [];


    const renderToDos = ({ item }: { item: ToDo }) => {
        if (selectedDay && !item.days.includes(selectedDay)) {
            return null;
        }
        return <ToDoCard toDo={item} />;
    };

    const handleOnPress = () => {
        router.navigate('screens/AddToDo' as RelativePathString);
    };

    const handleDaySelect = (day: string) => {
        dispatch(daySelectorActions.selectDay(day));
    };

    return (
        <Container>
            <WeekdaySelector selectedDay={selectedDay} onDaySelect={handleDaySelect} />

            {filteredToDos.length ? <ToDoList
                data={toDos}
                renderItem={renderToDos}
                keyExtractor={(item: ToDo) => item.id}
            /> : <View style={{ marginTop: '20%', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>
                    Sem rotinas adicionadas para esse dia!
                </Text>
            </View>}

            <AddButton onPress={handleOnPress}>
                <AntDesign name="pluscircleo" size={35} color="white" />
            </AddButton>
        </Container>
    );
}
