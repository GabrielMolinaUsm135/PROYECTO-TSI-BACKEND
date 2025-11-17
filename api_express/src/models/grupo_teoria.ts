import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from "sequelize-typescript";
import Alumno from "./alumno";

@Table({ tableName: "grupo_teoria", timestamps: false })
class GrupoTeoria extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: "id_grupo_teoria" })
    declare id_grupo_teoria: number;

    @Column({ type: DataType.STRING(255), allowNull: true, field: "nombre_grupo" })
    declare nombre_grupo: string | null;

    @Column({ type: DataType.STRING(255), allowNull: true, field: "nivel" })
    declare nivel: string | null;

    @HasMany(() => Alumno, { foreignKey: "id_grupo_teoria" })
    declare alumnos?: Alumno[];
}

export default GrupoTeoria;
