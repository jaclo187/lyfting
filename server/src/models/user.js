/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'username'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      field: 'email'
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
      field: 'password'
    },
    preferenceDistance: {
      type: DataTypes.ENUM('kilometer','mile'),
      allowNull: true,
      defaultValue: 'kilometer',
      field: 'preference_distance'
    },
    preferenceWeight: {
      type: DataTypes.ENUM('kilogramm','pound'),
      allowNull: true,
      defaultValue: 'kilogramm',
      field: 'preference_weight'
    }
  }, {
    tableName: 'user'
  });
};
