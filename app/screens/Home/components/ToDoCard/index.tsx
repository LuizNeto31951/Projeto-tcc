import React, { useState } from "react";
import { ToDo, Weekday } from "../../../../types/types";
import {
    CoinsContainer,
    CoinsQuantity,
    Container,
    ToDoCompleted,
    ToDoDescription,
    ToDoTitle,
    TimeText
} from "./styles";
import ModalViewToDo from "../ModalViewToDo";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

type Props = {
    toDo: ToDo;
};

export default function ToDoCard({ toDo }: Props) {
    const [modalVisible, setModalVisible] = useState(false);
    const { selectedDay } = useSelector((state: RootState) => state.daySelector);

    const isCompleted = (completed: Partial<Record<Weekday, boolean>>) => {
        return completed[selectedDay] === true;
    };

    return (
        <>
            <Container onPress={() => setModalVisible(true)}>
                <ToDoTitle>{toDo.title}</ToDoTitle>

                {toDo?.description && (
                    <ToDoDescription>{toDo.description}</ToDoDescription>
                )}

                {(toDo.startTime || toDo.endTime) && (
                    <TimeText>
                        {toDo.startTime} - {toDo.endTime}
                    </TimeText>
                )}

                <ToDoCompleted completed={isCompleted(toDo.completed)}>
                    {isCompleted(toDo.completed) ? "Completo!" : "Incompleto!"}
                </ToDoCompleted>

                {toDo.coins && (
                    <CoinsContainer>
                        <FontAwesome5 name="coins" size={24} color="black" />
                        <CoinsQuantity>{toDo.coins}</CoinsQuantity>
                    </CoinsContainer>
                )}
            </Container>

            <ModalViewToDo toDo={toDo} show={modalVisible} setModalVisible={setModalVisible} />
        </>
    );
}
