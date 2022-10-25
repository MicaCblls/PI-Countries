const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "touristActivity",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isBetween(value) {
            if (value < 1 || value > 5) {
              throw new Error("Difficulty between 1 and 5, please");
            }
          },
        },
      },
      duration: { type: DataTypes.FLOAT, allowNull: false },
      season: {
        type: DataTypes.ENUM("Summer", "Autumn", "Winter", "Spring"),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
