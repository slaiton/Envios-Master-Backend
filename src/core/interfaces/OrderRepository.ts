export interface Order {
    id: number;
    consecutive: string;
    id_origin: number;
    id_destination: number;
    id_vehicle: number;
    id_driver: number;
    id_status: number;
    fecha_compromiso: Date;
    fecha_entrega: Date;
    hora_entrega: string;
    created_at: Date;
    updated_at: Date;
    id_user_create: number;
    id_user_update?: number;
    id_user_delete?: number;
    deleted_at?: Date | null;
}