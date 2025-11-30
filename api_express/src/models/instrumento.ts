import { Table, Column, Model, DataType, PrimaryKey, BelongsToMany } from "sequelize-typescript";
import Insumo from "./insumo";
import InstrumentoInsumo from "./instrumento_insumo";


@Table({ tableName: "instrumento", timestamps: false })
class Instrumento extends Model {
    @PrimaryKey
    @Column({ type: DataType.STRING(8), field: "cod_instrumento" })
    declare cod_instrumento: string;

    @Column({ type: DataType.STRING(100), allowNull: true, field: "nombre_instrumento" })
    declare nombre_instrumento: string | null;

    @Column({ type: DataType.STRING(50), allowNull: true, field: "modelo_instrumento" })
    declare modelo_instrumento: string | null;

    // field name contains a special character in the SQL (tamaño). Map to 'tamano' property
    @Column({ type: DataType.STRING(20), allowNull: true, field: "tamano" })
    declare tamano: string | null;

    @Column({ type: DataType.STRING(255), allowNull: true, field: "observacion" })
    declare observacion: string | null;

    @BelongsToMany(() => Insumo, () => InstrumentoInsumo)
    declare insumos?: Insumo[];
}

export default Instrumento;
