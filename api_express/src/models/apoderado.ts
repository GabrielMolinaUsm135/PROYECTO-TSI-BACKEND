import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({ tableName: "apoderado", timestamps: false })
class Apoderado extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: "id_apoderado" })
    declare id_apoderado: number;

    @Column({ type: DataType.STRING(255), allowNull: true, unique: true, field: "rut" })
    declare rut: string | null;

    @Column({ type: DataType.STRING(255), allowNull: true, field: "nombre" })
    declare nombre: string | null;

    @Column({ type: DataType.STRING(255), allowNull: true, field: "correo" })
    declare correo: string | null;

    @Column({ type: DataType.STRING(255), allowNull: true, field: "telefono" })
    declare telefono: string | null;
}

export default Apoderado;
