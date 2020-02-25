/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('exerciseType', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    name: {
      type: DataTypes.ENUM('weight','time','body'),
      allowNull: false,
      field: 'name'
    }
  }, {
    tableName: 'exercise_type'
  });
};
