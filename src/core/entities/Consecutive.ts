export class Consecutive {
    public id: number;
    public value: string;
    public prefix: string;
    public fecha: Date;
  
    constructor(id: number, value: string, fecha: Date, prefix:string) {
      this.id = id;
      this.value = value;
      this.fecha = fecha;
      this.prefix = prefix;
    }
  }