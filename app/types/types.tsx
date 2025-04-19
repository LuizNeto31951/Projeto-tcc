export type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface ToDo {
    id: string;
    title: string;
    coins?: number;
    description?: string;
    days: Weekday[];
    shouldRemoveWhenComplete: boolean;
    completed: Partial<Record<Weekday, boolean>>;
    startTime?: string;
    endTime?: string;
}

export interface Coins {
    quantity: number;
}

export type ShopItemProps = {
    id: string;
    title?: string;
    coinCost?: number;
    imageSource?: any;
    isSkeleton?: boolean;
};