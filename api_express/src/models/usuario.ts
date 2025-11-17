import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique, ForeignKey, BelongsTo, HasOne, HasMany } from "sequelize-typescript";
import Alumno from "./alumno";
import Rol from "./rol";
import Profesor from "./profesor";

@Table({ tableName: "usuario", timestamps: false })
export class Usuario extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: "id_usuario" })
    declare id_usuario: number;

    @Unique
    @Column({ type: DataType.STRING(255), allowNull: true, field: "rut" })
    declare rut: string | null;

    @Column({ type: DataType.STRING(255), allowNull: true, field: "nombre" })
    declare nombre: string | null;

    @Column({ type: DataType.STRING(255), allowNull: true, field: "apellido_paterno" })
    declare apellido_paterno: string | null;

    @Column({ type: DataType.STRING(255), allowNull: true, field: "apellido_materno" })
    declare apellido_materno: string | null;

    @Unique
    @Column({ type: DataType.STRING(255), allowNull: true, field: "correo" })
    declare correo: string | null;

    @Column({ type: DataType.STRING(255), allowNull: true, field: "telefono" })
    declare telefono: string | null;

    @Column({ type: DataType.STRING(255), allowNull: true, field: "direccion" })
    declare direccion: string | null;

    @Column({ type: DataType.STRING(255), allowNull: true, field: "password" })
    declare password: string | null;

    @ForeignKey(() => Rol)
    @Column({ type: DataType.INTEGER, allowNull: true, field: "id_rol" })
    declare id_rol: number | null;

    @BelongsTo(() => Rol)
    declare rol?: Rol;

    @HasOne(() => Profesor, { foreignKey: "id_usuario" })
    declare profesor?: Profesor;

    @HasOne(() => Alumno, { foreignKey: "id_usuario" })
    declare alumno?: Alumno;
}

export default Usuario;