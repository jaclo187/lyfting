/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('set_exercise_log', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    reps: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true
    },
    time: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    fk_set: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'set',
        key: 'id'
      }
    },
    fk_exercise: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'exercise',
        key: 'id'
      }
    }
  }, {
    tableName: 'set_exercise_log'
  });
};
