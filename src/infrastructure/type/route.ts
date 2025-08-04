// src/navigation/types.ts
export type RootStackParamList = {
    ListadeTareas: undefined;
    Status: undefined;
    DetalleTarea: { task: Task };
};

export type Task = {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
};
