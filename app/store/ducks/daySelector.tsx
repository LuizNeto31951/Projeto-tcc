import { createActions, createReducer } from 'reduxsauce';

type Weekday = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

interface DaySelectorState {
    selectedDay: Weekday;
}
const getTodayAsWeekday = (): Weekday => {
    const days: Weekday[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayIndex = new Date().getDay();
    return days[todayIndex];
};

const initialState: DaySelectorState = {
    selectedDay: getTodayAsWeekday(),
};

type SelectDayAction = {
    type: string;
    day: Weekday;
};

const selectDay = (state: DaySelectorState, action: SelectDayAction): DaySelectorState => {
    return {
        ...state,
        selectedDay: action.day,
    };
};

export const { Types, Creators } = createActions({
    selectDay: ['day'],
});

const HANDLERS = {
    [Types.SELECT_DAY]: selectDay,
} as const;

export default createReducer<DaySelectorState>(initialState, HANDLERS);
