import { ClientRepositoryImpl } from "../../infrastructure/repositories/ClientRepositoryImpl";

export class ClientUseCase {
    constructor(private clientRepository: ClientRepositoryImpl) {}
      async execute(): Promise<void> {
        return await this.clientRepository.getAllClients()
      }
  }