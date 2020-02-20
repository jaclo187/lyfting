/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('workout', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'date'
    },
    fkUser: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      field: 'fk_user'
    }
  }, {
    tableName: 'workout'
  });
};
