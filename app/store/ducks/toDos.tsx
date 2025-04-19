import { ToDo, Weekday } from "@/app/types/types";
import { createActions, createReducer } from 'reduxsauce';

interface ToDoState {
    toDos: ToDo[];
}

const initialState: ToDoState = {
    toDos: [],
};

type AddToDoAction = {
    type: string;
    toDo: ToDo;
};

type RemoveToDoFromDayAction = {
    type: string;
    id: string;
    day: Weekday;
};

type CompleteToDoAction = {
    type: string;
    id: string;
    day: Weekday;
};

const addToDo = (state: ToDoState, action: AddToDoAction): ToDoState => ({
    ...state,
    toDos: [...state.toDos, action.toDo],
});

const removeToDoFromDay = (state: ToDoState, action: RemoveToDoFromDayAction): ToDoState => {
    const updatedToDos = state.toDos
        .map((todo) => {
            if (todo.id === action.id) {
                const updatedDays = todo.days.filter(day => day !== action.day);
                if (updatedDays.length === 0) return null;

                const updatedCompleted = { ...todo.completed };
                delete updatedCompleted[action.day];

                return {
                    ...todo,
                    days: updatedDays,
                    completed: updatedCompleted,
                };
            }
            return todo;
        })
        .filter(Boolean) as ToDo[];

    return { ...state, toDos: updatedToDos };
};

const completeToDo = (state: ToDoState, action: CompleteToDoAction): ToDoState => {
    const updatedToDos = state.toDos.map((todo) => {
        if (todo.id === action.id) {
            const updatedCompleted = {
                ...todo.completed,
                [action.day]: true,
            };

            const shouldRemove = todo.shouldRemoveWhenComplete &&
                todo.days.every(day => updatedCompleted[day]);

            return shouldRemove ? null : {
                ...todo,
                completed: updatedCompleted,
            };
        }
        return todo;
    }).filter(Boolean) as ToDo[];

    return { ...state, toDos: updatedToDos };
};

export const { Types, Creators } = createActions({
    addToDo: ['toDo'],
    removeToDoFromDay: ['id', 'day'],
    completeToDo: ['id', 'day'],
});

const HANDLERS = {
    [Types.ADD_TO_DO]: addToDo,
    [Types.REMOVE_TO_DO_FROM_DAY]: removeToDoFromDay,
    [Types.COMPLETE_TO_DO]: completeToDo,
};

export default createReducer<ToDoState>(initialState, HANDLERS);
