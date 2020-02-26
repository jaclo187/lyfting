/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('set', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    fk_workout: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'workout',
        key: 'id'
      }
    }
  }, {
    tableName: 'set'
  });
};
