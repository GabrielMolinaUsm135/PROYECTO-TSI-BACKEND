import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "usuario", timestamps: false })
export class Usuario extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "id_usuario"
    })
    declare id_usuario: number;

    @Column({
        type: DataType.STRING(30),
        allowNull: false,
        unique: true,
        field: "username"
    })
    declare username: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        field: "password"
    })
    declare password: string;

    @Column({
        type: DataType.CHAR(1),
        allowNull: false,
        field: "tipo_usuario"
    })
    declare tipo_usuario: string;
}

export default Usuario;