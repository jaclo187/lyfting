/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('workoutSet', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    fkWorkout: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'workout',
        key: 'id'
      },
      field: 'fk_workout'
    },
    fkSet: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'set',
        key: 'id'
      },
      field: 'fk_set'
    }
  }, {
    tableName: 'workout_set'
  });
};
