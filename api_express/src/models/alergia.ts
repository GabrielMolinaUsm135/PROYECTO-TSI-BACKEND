import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsToMany } from "sequelize-typescript";
import Alumno from "./alumno";
import AlumnoAlergia from "./alumno_alergia";


@Table({ tableName: "alergia", timestamps: false })
class Alergia extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: "cod_alergia" })
    declare cod_alergia: number;

    @Column({ type: DataType.STRING(255), allowNull: true, field: "nombre_alergia" })
    declare nombre_alergia: string | null;

    @BelongsToMany(() => Alumno, () => AlumnoAlergia)
    declare alumnos?: Alumno[];
}

export default Alergia;
