import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import Usuario from "./usuario";

@Table({ tableName: "profesor", timestamps: false })
class Profesor extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: "id_profesor" })
    declare id_profesor: number;

    @ForeignKey(() => Usuario)
    @Column({ type: DataType.INTEGER, allowNull: true, unique: true, field: "id_usuario" })
    declare id_usuario: number | null;

    @Column({ type: DataType.STRING(255), allowNull: true, field: "asignatura" })
    declare asignatura: string | null;

    @BelongsTo(() => Usuario)
    declare usuario?: Usuario;
}

export default Profesor;
