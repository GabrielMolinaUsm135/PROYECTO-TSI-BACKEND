import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany, ForeignKey } from "sequelize-typescript";
import insumo from "./insumo";

@Table({ tableName: "imagenes_insumos", timestamps: false })
class imagenes_insumos extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: "id_image" })
    declare id_image: number;

    @ForeignKey(() => insumo)
    @Column({ type: DataType.STRING(8), allowNull: true, unique: true, field: "cod_insumo" })
    declare cod_insumo: string | null;

    @Column({ type: DataType.BLOB('medium'), allowNull: true, field: "imagenIns" })
    declare imagenIns: Buffer | null;
}

export default imagenes_insumos;