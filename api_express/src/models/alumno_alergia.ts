import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, BelongsTo } from "sequelize-typescript";
import Alergia from "./alergia";
import Alumno from "./alumno";

@Table({ tableName: "alumno_alergia", timestamps: false })
class AlumnoAlergia extends Model {
    @PrimaryKey
    @ForeignKey(() => Alergia)
    @Column({ type: DataType.INTEGER, field: "cod_alergia" })
    declare cod_alergia: number;

    @PrimaryKey
    @ForeignKey(() => Alumno)
    @Column({ type: DataType.INTEGER, field: "id_alumno" })
    declare id_alumno: number;

    @BelongsTo(() => Alergia)
    declare alergia?: Alergia;

    @BelongsTo(() => Alumno)
    declare alumno?: Alumno;
}

export default AlumnoAlergia;
