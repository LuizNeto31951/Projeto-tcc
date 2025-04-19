import React from "react";
import { Weekday } from "@/app/types/types";
import { DayButton, DayText, Row } from "./styles";

const DAYS: { label: string; value: Weekday }[] = [
    { label: "Dom", value: "sunday" },
    { label: "Seg", value: "monday" },
    { label: "Ter", value: "tuesday" },
    { label: "Qua", value: "wednesday" },
    { label: "Qui", value: "thursday" },
    { label: "Sex", value: "friday" },
    { label: "Sáb", value: "saturday" },
];

interface Props {
    selectedDays: Weekday[];
    onChange: (days: Weekday[]) => void;
}

export function WeekdaySelector({ selectedDays, onChange }: Props) {
    const toggleDay = (day: Weekday) => {
        if (selectedDays.includes(day)) {
            onChange(selectedDays.filter(d => d !== day));
        } else {
            onChange([...selectedDays, day]);
        }
    };

    return (
        <Row>
            {DAYS.map((d) => (
                <DayButton key={d.value} onPress={() => toggleDay(d.value)} selected={selectedDays.includes(d.value)}>
                    <DayText>{d.label}</DayText>
                </DayButton>
            ))}
        </Row>
    );
}