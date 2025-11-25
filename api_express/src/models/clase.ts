import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from "sequelize-typescript";

@Table({ tableName: "profesor", timestamps: false })
class Clase extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, field: "id_profesor" })
    declare id_profesor: number;

    @Column({ type: DataType.STRING(50), allowNull: true, field: "id_usuario" })
    declare id_usuario: number | null;

     @Column({ type: DataType.STRING(50), allowNull: true, field: "asignatura" })
    declare asignatura: string | null;
    
}

export default Clase;
