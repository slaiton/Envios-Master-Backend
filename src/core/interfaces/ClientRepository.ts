export interface ClientRepository {
    getAllClients (): Promise<void>
    loadClients(): Promise<void>;
}