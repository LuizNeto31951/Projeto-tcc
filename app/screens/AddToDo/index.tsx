import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Alert, Keyboard, Switch, View, Platform, TouchableOpacity
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Creators as toDoActions } from "@/app/store/ducks/toDos";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToDo, Weekday } from "@/app/types/types";
import { router, Stack } from "expo-router";
import { useDispatch } from "react-redux";
import {
    Container, ErrorText, Input, Label,
    AddButton, ButtonText
} from "./styles";
import { WeekdaySelector } from "./components/WeekdaySelector";

type ToDoFormData = {
    title: string;
    description?: string;
    coins?: number;
    days: Weekday[];
    shouldRemoveWhenComplete: boolean;
    startTime: Date;
    endTime: Date;
};

const todoSchema = yup.object({
    title: yup.string().required("O título é obrigatório"),
    description: yup.string().optional(),
    coins: yup.number().min(0).max(10, "Minimo de 0 e maximo de 10 moedas por rotina!").optional(),
    days: yup
        .array()
        .of(yup.mixed<Weekday>().oneOf([
            "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
        ]).required())
        .min(1, "Selecione pelo menos um dia")
        .required("Os dias são obrigatórios"),
    shouldRemoveWhenComplete: yup.boolean().required(),
    startTime: yup.date().required("Horário de início obrigatório"),
    endTime: yup.date().required("Horário de término obrigatório"),
}).required();

export default function AddToDo() {
    const dispatch = useDispatch();
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ToDoFormData>({
        resolver: yupResolver(todoSchema),
        defaultValues: {
            title: "",
            description: "",
            coins: undefined,
            days: [],
            shouldRemoveWhenComplete: false,
            startTime: undefined,
            endTime: undefined,
        },
    });

    const formatTime = (date: Date | null) => {
        if (!date) return "";
        return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    };

    const submitForm = (data: ToDoFormData) => {
        const newTodo: ToDo = {
            id: Math.random().toString(36).substr(2, 9),
            title: data.title,
            description: data.description,
            coins: data.coins,
            days: data.days,
            shouldRemoveWhenComplete: data.shouldRemoveWhenComplete,
            completed: {},
            startTime: formatTime(data.startTime),
            endTime: formatTime(data.endTime),
        };

        Keyboard.dismiss();
        dispatch(toDoActions.addToDo(newTodo) as any);
        reset();
        Alert.alert("Sucesso", "ToDo adicionado!", [
            { text: "Voltar!", onPress: () => router.navigate("/") },
        ]);
    };

    return (
        <>
            <Stack.Screen options={{ title: "Adicionar rotina!" }} />
            <Container>
                <Label>Título</Label>
                <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Digite o título"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.title && <ErrorText>{errors.title.message}</ErrorText>}

                <Label>Descrição</Label>
                <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Digite a descrição"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />

                <Label>Moedas</Label>
                <Controller
                    control={control}
                    name="coins"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="0 a 10"
                            keyboardType="numeric"
                            maxLength={10}
                            value={String(value || '')}
                            onChangeText={(text) => onChange(Number(text))}
                        />
                    )}
                />
                {errors.coins && <ErrorText>{errors.coins.message}</ErrorText>}

                <Label>Dias da semana</Label>
                <Controller
                    control={control}
                    name="days"
                    render={({ field: { value, onChange } }) => (
                        <WeekdaySelector selectedDays={value} onChange={onChange} />
                    )}
                />
                {errors.days && <ErrorText>{errors.days.message}</ErrorText>}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15 }}>
                    <Label>Remover ao final da semana?</Label>
                    <Controller
                        control={control}
                        name="shouldRemoveWhenComplete"
                        render={({ field: { value, onChange } }) => (
                            <Switch value={value} onValueChange={onChange} />
                        )}
                    />
                </View>

                <Label>Horário de Início</Label>
                <Controller
                    control={control}
                    name="startTime"
                    render={({ field: { value, onChange } }) => (
                        <>
                            <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                                <Input
                                    placeholder="Selecionar horário de início"
                                    value={formatTime(value)}
                                    editable={false}
                                />
                            </TouchableOpacity>
                            {showStartPicker && (
                                <DateTimePicker
                                    value={value || new Date()}
                                    mode="time"
                                    is24Hour={true}
                                    display={Platform.OS === "ios" ? "spinner" : "default"}
                                    onChange={(_, selectedDate) => {
                                        setShowStartPicker(false);
                                        if (selectedDate) onChange(selectedDate);
                                    }}
                                />
                            )}
                            {errors.startTime && <ErrorText>{errors.startTime.message}</ErrorText>}
                        </>
                    )}
                />

                <Label>Horário de Término</Label>
                <Controller
                    control={control}
                    name="endTime"
                    render={({ field: { value, onChange } }) => (
                        <>
                            <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                                <Input
                                    placeholder="Selecionar horário de término"
                                    value={formatTime(value)}
                                    editable={false}
                                />
                            </TouchableOpacity>
                            {showEndPicker && (
                                <DateTimePicker
                                    value={value || new Date()}
                                    mode="time"
                                    is24Hour={true}
                                    display={Platform.OS === "ios" ? "spinner" : "default"}
                                    onChange={(_, selectedDate) => {
                                        setShowEndPicker(false);
                                        if (selectedDate) onChange(selectedDate);
                                    }}
                                />
                            )}
                            {errors.endTime && <ErrorText>{errors.endTime.message}</ErrorText>}
                        </>
                    )}
                />

                <AddButton onPress={handleSubmit(submitForm)}>
                    <ButtonText>Adicionar!</ButtonText>
                </AddButton>
            </Container>
        </>
    );
}
