export class Indicator {
    constructor(
      public totalVehicles: number,
      public totalDrivers: number,
      public totalDispatchedOrders: number,
      public availableVehicles?: number // Nuevo campo opcional
    ) {}
  }