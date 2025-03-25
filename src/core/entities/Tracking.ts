export class Tracking {
    constructor(
      public id: number,
      public id_order: number,
      public id_status: number,
      public id_user_create: number,
      public id_user_update?: number | null,
      public id_user_delete?: number | null,
      public deleted_at?: Date | null,
      public created_at?: Date,
      public updated_at?: Date
    ) {}
  
    isDeleted(): boolean {
      return this.deleted_at !== null;
    }
  }