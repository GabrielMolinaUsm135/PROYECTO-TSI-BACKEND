import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import Usuario from "./usuario";
import Apoderado from "./apoderado";
import GrupoTeoria from "./grupo_teoria";
import Notas from "./notas";

@Table({ tableName: "alumno", timestamps: false })
class Alumno extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: "id_alumno" })
    declare id_alumno: number;

    @ForeignKey(() => Apoderado)
    @Column({ type: DataType.INTEGER, allowNull: true, field: "id_apoderado" })
    declare id_apoderado: number | null;

    @ForeignKey(() => Usuario)
    @Column({ type: DataType.INTEGER, allowNull: true, unique: true, field: "id_usuario" })
    declare id_usuario: number | null;

    @Column({ type: DataType.STRING(50), allowNull: true, field: "nombre" })
    declare nombre: string | null;

    @Column({ type: DataType.STRING(50), allowNull: true, field: "apellido_paterno" })
    declare apellido_paterno: string | null;

    @Column({ type: DataType.STRING(50), allowNull: true, field: "apellido_materno" })
    declare apellido_materno: string | null;

    @Column({ type: DataType.STRING(15), allowNull: true, field: "telefono" })
    declare telefono: string | null;

    @Column({ type: DataType.STRING(150), allowNull: true, field: "direccion" })
    declare direccion: string | null;

    @Column({ type: DataType.STRING(255), allowNull: true, field: "diagnostico_ne" })
    declare diagnostico_ne: string | null;

    @ForeignKey(() => GrupoTeoria)
    @Column({ type: DataType.INTEGER, allowNull: true, field: "id_grupo_teoria" })
    declare id_grupo_teoria: number | null;

    @Column({ type: DataType.DATE, allowNull: true, field: "fecha_ingreso" })
    declare fecha_ingreso: Date | null;

    @BelongsTo(() => Apoderado)
    declare apoderado?: Apoderado;

    @BelongsTo(() => Usuario)
    declare usuario?: Usuario;

    @BelongsTo(() => GrupoTeoria)
    declare grupo_teoria?: GrupoTeoria;

    @HasMany(() => Notas, { foreignKey: "id_alumno" })
    declare notas?: Notas[];

    // many-to-many with Alergia through alumno_alergia will be defined in allergy model if needed
}

export default Alumno;