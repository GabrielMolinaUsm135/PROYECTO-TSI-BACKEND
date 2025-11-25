import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import Usuario from "./usuario";

@Table({ tableName: "usuario", timestamps: false })
class Profesor extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: "id_usuario" })
    declare id_profesor: number;

    @ForeignKey(() => Usuario)
    @Column({ type: DataType.INTEGER, allowNull: true, unique: true, field: "id_usuario" })
    declare id_usuario: number | null;

    @Column({ type: DataType.STRING(50), allowNull: true, field: "rut" })
    declare rut: string | null;

    @Column({ type: DataType.STRING(50), allowNull: true, field: "nombre" })
    declare nombre: string | null;

    @Column({ type: DataType.STRING(50), allowNull: true, field: "apellido_paterno" })
    declare apellido_paterno: string | null;

    @Column({ type: DataType.STRING(50), allowNull: true, field: "apellido_materno" })
    declare apellido_materno: string | null;

    @Column({ type: DataType.STRING(15), allowNull: true, field: "telefono" })
    declare telefono: string | null;

    @Column({ type: DataType.STRING(150), allowNull: true, field: "direccion" })
    declare direccion: string | null;

    @Column({ type: DataType.STRING(50), allowNull: true, field: "asignatura" })
    declare asignatura: string | null;

    @BelongsTo(() => Usuario)
    declare usuario?: Usuario;
}

export default Profesor;
