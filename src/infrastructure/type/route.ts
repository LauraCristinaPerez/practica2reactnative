// src/navigation/types.ts
export type RootStackParamList = {
    Inicio: undefined;
    Configuración: undefined;
    DetalleTarea: { task: Task };
};

export type Task = {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
};


