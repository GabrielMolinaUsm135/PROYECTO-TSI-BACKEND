import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from "sequelize-typescript";
import Instrumento from "./instrumento";
import Usuario from "./usuario";

@Table({ tableName: "prestamo_instrumento", timestamps: false })
class PrestamoInstrumento extends Model {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, field: "cod_prestamo" })
    declare cod_prestamo: number;

    @ForeignKey(() => Instrumento)
    @Column({ type: DataType.STRING(8), allowNull: true, field: "cod_instrumento" })
    declare cod_instrumento: string | null;

    @ForeignKey(() => Usuario)
    @Column({ type: DataType.INTEGER, allowNull: true, field: "id_usuario" })
    declare id_usuario: number | null;

    @Column({ type: DataType.DATE, allowNull: true, field: "fecha_prestamo" })
    declare fecha_prestamo: Date | null;

    @Column({ type: DataType.DATE, allowNull: true, field: "fecha_devolucion" })
    declare fecha_devolucion: Date | null;

    @Column({ type: DataType.STRING(20), allowNull: true, field: "estado" })
    declare estado: string | null;

    @BelongsTo(() => Instrumento)
    declare instrumento?: Instrumento;

    @BelongsTo(() => Usuario)
    declare usuario?: Usuario;
}

export default PrestamoInstrumento;
