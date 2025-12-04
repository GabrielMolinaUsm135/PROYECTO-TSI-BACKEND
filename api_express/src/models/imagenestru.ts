import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany, ForeignKey } from "sequelize-typescript";
import Instrumento from "./instrumento";

@Table({ tableName: "imagenes_instrumentos", timestamps: false })
class imagenes_instrumentos extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: "id_img" })
    declare id_img: number;

    @ForeignKey(() => Instrumento)
    @Column({ type: DataType.STRING(8), allowNull: true, unique: true, field: "cod_instrumento" })
    declare cod_instrumento: string | null;

    @Column({ type: DataType.BLOB('medium'), allowNull: true, field: "imagentr" })
    declare imagentr: Buffer | null;
}

export default imagenes_instrumentos;