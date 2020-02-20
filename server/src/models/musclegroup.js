/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('musclegroup', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'name'
    }
  }, {
    tableName: 'musclegroup'
  });
};
