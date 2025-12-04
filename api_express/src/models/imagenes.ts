import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany, ForeignKey } from "sequelize-typescript";
import Usuario from "./usuario";

@Table({ tableName: "imagenes", timestamps: false })
class GrupoTeoria extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: "id_imagen" })
    declare id_imagen: number;

    @ForeignKey(() => Usuario)
    @Column({ type: DataType.INTEGER, allowNull: true, unique: true, field: "id_usuario" })
    declare id_usuario: number | null;

    @Column({ type: DataType.BLOB('medium'), allowNull: true, field: "imagenB" })
    declare imagenB: Buffer | null;
}

export default GrupoTeoria;
