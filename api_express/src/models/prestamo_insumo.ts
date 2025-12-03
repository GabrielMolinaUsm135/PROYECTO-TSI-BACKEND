import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from "sequelize-typescript";
import Insumo from "./insumo";
import Usuario from "./usuario";

@Table({ tableName: "prestamo_insumo", timestamps: false })
class PrestamoInsumo extends Model {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, field: "cod_prestamo" })
    declare cod_prestamo: number;

    @ForeignKey(() => Insumo)
    @Column({ type: DataType.STRING(8), allowNull: true, field: "cod_insumo" })
    declare cod_insumo: string | null;

    @ForeignKey(() => Usuario)
    @Column({ type: DataType.INTEGER, allowNull: true, field: "id_usuario" })
    declare id_usuario: number | null;

    @Column({ type: DataType.DATE, allowNull: true, field: "fecha_prestamo" })
    declare fecha_prestamo: Date | null;

    @Column({ type: DataType.DATE, allowNull: true, field: "fecha_devolucion" })
    declare fecha_devolucion: Date | null;

    @Column({ type: DataType.STRING(20), allowNull: true, field: "estado" })
    declare estado: string | null;

    @BelongsTo(() => Insumo)
    declare insumo?: Insumo;

    @BelongsTo(() => Usuario)
    declare usuario?: Usuario;
}

export default PrestamoInsumo;
