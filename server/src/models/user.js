/* jshint indent: 2 */
//const Promise = require('bluebird') -- No need to promisify current versions of bcrypt
const bcrypt = require('bcryptjs')

const cryptPassword = async user => {
  if(!user.changed('password')) return
  user.password = await bcrypt.hash(user.password, 10)
}

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        field: 'id'
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: 'username'
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        field: 'email'
      },
      password: {
        type: DataTypes.STRING(256),
        field: 'password'
      },
      preferenceDistance: {
        type: DataTypes.ENUM('kilometer','mile'),
        allowNull: true,
        defaultValue: 'kilometer',
        field: 'preference_distance'
      },
      preferenceWeight: {
        type: DataTypes.ENUM('kilogramm','pound'),
        allowNull: true,
        defaultValue: 'kilogramm',
        field: 'preference_weight'
      }
    }, {
      tableName: 'user',
      hooks : {
        beforeCreate: cryptPassword,
        beforeUpdate: cryptPassword /**I tested a lot of differend ideas, this one seems to be the only one to work :( */
      }
  })

  user.prototype.comparePasswords = function (password) {
    return bcrypt.compare(password, this.password)
  }

  return user

};
