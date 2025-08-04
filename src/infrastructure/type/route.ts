// src/navigation/types.ts
export type RootStackParamList = {
    Añadir_Tarea_Especifica: undefined;
    Status: undefined;
    Detalle_De_Tarea_Especifica: { task: Task };
};

export type Task = {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
};
