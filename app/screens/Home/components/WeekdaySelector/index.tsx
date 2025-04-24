import React from "react";
import { Button, Container, ButtonText } from "./styles";
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
                    key={day.value}
                    onPress={() => onDaySelect(day.value)}
                    selected={selectedDay === day.value}
                    activeOpacity={0.8}
                >
                    <ButtonText
                        selected={selectedDay === day.value}
                        adjustsFontSizeToFit
                        numberOfLines={1}
                    >
                        {day.label.toUpperCase()}
                    </ButtonText>
                </Button>
            ))}
        </Container>
    );
};

export default WeekdaySelector;
