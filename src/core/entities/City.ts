export class City {
    id: number;
    departament: string;
    prefix: string;
    name: string;

    constructor(id: number, name: string, departament: string, prefix: string) {
        this.id = id;
        this.name = name;
        this.departament = departament;
        this.prefix = prefix;
    }
}