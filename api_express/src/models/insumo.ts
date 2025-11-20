import { Table, Column, Model, DataType, PrimaryKey, BelongsToMany } from "sequelize-typescript";
import Instrumento from "./instrumento";
import InstrumentoInsumo from "./instrumento_insumo";

@Table({ tableName: "insumo", timestamps: false })
class Insumo extends Model {
    @PrimaryKey
    @Column({ type: DataType.STRING(8), field: "cod_insumo" })
    declare cod_insumo: string;

    @Column({ type: DataType.STRING(100), allowNull: true, field: "nombre_insumo" })
    declare nombre_insumo: string | null;

    @Column({ type: DataType.STRING(255), allowNull: true, field: "observacion" })
    declare observacion: string | null;

    @BelongsToMany(() => Instrumento, () => InstrumentoInsumo)
    declare instrumentos?: Instrumento[];
}

export default Insumo;
