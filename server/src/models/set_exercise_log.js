/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('setExerciseLog', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'weight'
    },
    reps: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true,
      field: 'reps'
    },
    time: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      field: 'time'
    },
    fkSet: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      references: {
        model: 'set',
        key: 'id'
      },
      field: 'fk_set'
    },
    fkExercise: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      references: {
        model: 'exercise',
        key: 'id'
      },
      field: 'fk_exercise'
    }
  }, {
    tableName: 'set_exercise_log'
  });
};
