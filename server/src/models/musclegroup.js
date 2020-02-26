/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('musclegroup', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'musclegroup'
  });
};
