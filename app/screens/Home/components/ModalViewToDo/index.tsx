import React from "react";
import { Modal } from "react-native";
import { ToDo, Weekday } from "../../../../types/types";
import { CompleteTodo, LabelButton, ModalContainer, RemoveTodo, Shadow, ToDoCompleted, ToDoDate, ToDoDescription, ToDoTitle } from "./style";
import { TouchableWithoutFeedback } from "react-native";
import { Creators as toDoActions } from "@/app/store/ducks/toDos";
import { Creators as coinsActions } from "@/app/store/ducks/coins";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";

interface ModalProps {
    toDo: ToDo;
    show: boolean;
    setModalVisible: (visible: boolean) => void;
}

const ModalViewToDo: React.FC<ModalProps> = ({ toDo, show, setModalVisible }) => {
    const dispatch = useDispatch();
    const { selectedDay } = useSelector((state: RootState) => state.daySelector);
    const coinLabel = (toDo?.coins || 0) > 1 ? " Moedas" : " Moeda";

    const isCompleted = (completed: Partial<Record<Weekday, boolean>>) => {
        return completed[selectedDay] === true;
    };

    const handleCompleteTodo = () => {
        dispatch(toDoActions.completeToDo(toDo.id, selectedDay) as any);
        dispatch(coinsActions.addCoin(toDo.coins) as any);
        setModalVisible(false);
    }

    const handleRemoveTodo = () => {
        dispatch(toDoActions.removeToDoFromDay(toDo.id, selectedDay) as any);
        setModalVisible(false);
    }

    return (
        <Modal transparent={true} visible={show} animationType="slide">
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <Shadow />
            </TouchableWithoutFeedback>
            <ModalContainer>
                <ToDoTitle>{toDo.title}</ToDoTitle>
                {toDo?.description && <ToDoDescription>{toDo.description}</ToDoDescription>}

                <ToDoCompleted completed={isCompleted(toDo.completed)}>
                    {isCompleted(toDo.completed) ? "Completo!" : "Incompleto!"}
                </ToDoCompleted>

                {!isCompleted(toDo.completed) && (
                    <CompleteTodo onPress={handleCompleteTodo}>
                        <LabelButton>{`Completar! ${toDo.coins ? "(+" + String(toDo.coins) + coinLabel + ")" : ""}`}</LabelButton>
                    </CompleteTodo>
                )}

                <RemoveTodo onPress={handleRemoveTodo}>
                    <LabelButton>Remover!</LabelButton>
                </RemoveTodo>
            </ModalContainer>
        </Modal>
    );
};

export default ModalViewToDo;
