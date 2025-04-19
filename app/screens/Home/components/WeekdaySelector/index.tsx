import React from "react";
import { Button, Container } from "./styles";
import { Text } from "react-native";
import { Weekday } from "@/app/types/types";

interface WeekdaySelectorProps {
    selectedDay: Weekday | null;
    onDaySelect: (day: Weekday) => void;
}

const DAYS: { label: string; value: Weekday }[] = [
    { label: "Dom", value: "sunday" },
    { label: "Seg", value: "monday" },
    { label: "Ter", value: "tuesday" },
    { label: "Qua", value: "wednesday" },
    { label: "Qui", value: "thursday" },
    { label: "Sex", value: "friday" },
    { label: "Sáb", value: "saturday" },
];

const WeekdaySelector: React.FC<WeekdaySelectorProps> = ({ selectedDay, onDaySelect }) => {

    return (
        <Container>
            {DAYS.map((day) => (
                <Button
                    key={day.label}
                    onPress={() => onDaySelect(day.value)}
                    selected={selectedDay === day.value}
                >
                    <Text>{day.label.toUpperCase()}</Text>
                </Button>
            ))}
        </Container>
    );
};

export default WeekdaySelector;
