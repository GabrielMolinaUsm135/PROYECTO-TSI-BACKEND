import { Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";
import Usuario from "./usuario";

@Table({ tableName: "alumno" })
class Alumno extends Model {
    @Column({
        type: DataType.STRING(12),
        primaryKey: true,
        allowNull: false,
        field: "rut_alumno"
    })
    declare rut_alumno: string;

    @Column({
        type: DataType.STRING(12),
        allowNull: true,
        field: "rut_apoderado"
    })
    declare rut_apoderado: string | null;

    @Column({
        type: DataType.STRING(10),
        allowNull: true,
        field: "nombre_alumno"
    })
    declare nombre_alumno: string | null;

    @Column({
        type: DataType.STRING(10),
        allowNull: true,
        field: "apellido_paterno"
    })
    declare apellido_paterno: string | null;

    @Column({
        type: DataType.STRING(10),
        allowNull: true,
        field: "apellido_materno"
    })
    declare apellido_materno: string | null;

    @Column({
        type: DataType.STRING(15),
        allowNull: true,
        field: "telefono_alumno"
    })
    declare telefono_alumno: string | null;

    @Column({
        type: DataType.STRING(40),
        allowNull: true,
        field: "correo_alumno"
    })
    declare correo_alumno: string | null;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
        field: "direccion_alumno"
    })
    declare direccion_alumno: string | null;

    @Column({
        type: DataType.STRING(100),
        allowNull: true,
        field: "diagnostico_ne"
    })
    declare diagnostico_ne: string | null;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "anio_ingreso_orquesta"
    })
    declare anio_ingreso_orquesta: number | null;

    @ForeignKey(() => Usuario)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: "id_usuario"
    })
    declare id_usuario: number | null;
}

export default Alumno;