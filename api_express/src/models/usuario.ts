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
    @Column({ type: DataType.STRING(150), allowNull: false, unique: true, field: "correo" })
    declare correo: string;

    @Column({ type: DataType.STRING(255), allowNull: false, field: "password" })
    declare password: string;

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