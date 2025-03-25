export interface ClientRepository {
    loadClients(): Promise<void>;
}