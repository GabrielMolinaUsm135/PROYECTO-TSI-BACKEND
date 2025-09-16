import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "alumno"})
class Alumno extends Model {
    @Column({type:DataType.STRING()})
}