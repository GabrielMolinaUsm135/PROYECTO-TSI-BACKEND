import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from "sequelize-typescript";
import Instrumento from "./instrumento";
import Insumo from "./insumo";

@Table({ tableName: "instrumento_insumo", timestamps: false })
class InstrumentoInsumo extends Model {
    @PrimaryKey
    @ForeignKey(() => Instrumento)
    @Column({ type: DataType.STRING(8), field: "cod_instrumento" })
    declare cod_instrumento: string;

    @PrimaryKey
    @ForeignKey(() => Insumo)
    @Column({ type: DataType.STRING(8), field: "cod_insumo" })
    declare cod_insumo: string;

    @BelongsTo(() => Instrumento)
    declare instrumento?: Instrumento;

    @BelongsTo(() => Insumo)
    declare insumo?: Insumo;
}

export default InstrumentoInsumo;
