export interface Habit {
    id: string;
    name: string;
    days: { [key: string]: boolean };
    streak: number;  
  }