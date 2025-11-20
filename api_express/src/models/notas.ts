import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import Alumno from "./alumno";

@Table({ tableName: "notas", timestamps: false })
class Notas extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: "id_nota" })
    declare id_nota: number;

    @ForeignKey(() => Alumno)
    @Column({ type: DataType.INTEGER, allowNull: true, field: "id_alumno" })
    declare id_alumno: number | null;

    @Column({ type: DataType.DATE, allowNull: true, field: "fecha_evaluacion" })
    declare fecha_evaluacion: Date | null;

    @Column({ type: DataType.STRING(150), allowNull: true, field: "nombre_evaluacion" })
    declare nombre_evaluacion: string | null;

    @Column({ type: DataType.INTEGER, allowNull: true, field: "nota" })
    declare nota: number | null;

    @BelongsTo(() => Alumno)
    declare alumno?: Alumno;
}

export default Notas;
