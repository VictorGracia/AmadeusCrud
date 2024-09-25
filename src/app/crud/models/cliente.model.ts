export interface Cliente {
    id?: number;
    nombre?: string;
    apellido?: string;
    email?: string;
    tipoDocumento?: string;
    numeroDocumento?: string;
    fechaNacimiento: Date;
    pais?: string;
    saldo: number;
    esActivo: boolean;
}