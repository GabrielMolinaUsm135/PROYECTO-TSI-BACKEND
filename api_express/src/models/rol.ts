import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from "sequelize-typescript";
import Usuario from "./usuario";

@Table({ tableName: "rol", timestamps: false })
class Rol extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: "id_rol" })
    declare id_rol: number;

    @Column({ type: DataType.STRING(255), allowNull: true, field: "nombre_rol" })
    declare nombre_rol: string | null;

    @HasMany(() => Usuario, { foreignKey: "id_rol" })
    declare usuarios?: Usuario[];
}

export default Rol;
