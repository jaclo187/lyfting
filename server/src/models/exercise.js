/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('exercise', {
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
    },
    fkMusclegroup: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      references: {
        model: 'musclegroup',
        key: 'id'
      },
      field: 'fk_musclegroup'
    },
    fkType: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      references: {
        model: 'exercise_type',
        key: 'id'
      },
      field: 'fk_type'
    }
  }, {
    tableName: 'exercise'
  });
};
