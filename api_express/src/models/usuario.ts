import { BeforeCreate, Column, DataType, Model, Table } from "sequelize-typescript";
import bcrypt from "bcrypt";

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
        type: DataType.STRING(60),
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

    @BeforeCreate
    static async hashPassword(usuario: Usuario) {
        usuario.password = await bcrypt.hash(usuario.password, 10);
    }
}

export default Usuario;