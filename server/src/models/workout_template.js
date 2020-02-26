/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('workout_template', {
    fk_user: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    fk_workout: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'workout',
        key: 'id'
      }
    }
  }, {
    tableName: 'workout_template'
  });
};
