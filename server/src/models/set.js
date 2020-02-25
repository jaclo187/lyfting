/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('set', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    }
  }, {
    tableName: 'set'
  });
};
