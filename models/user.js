'use strict';
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.Sequelize.Model
    class User extends Model {}
    User.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                function(value) {
                    if (value === null || value === '') {
                        throw new Error('Email Cannot Be Empty')
                    }
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                function(value) {
                    if (value === null || value === '') {
                        throw new Error('Password Cannot Be Empty')
                    }
                }
            }
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                function(value) {
                    if (value === null || value === '') {
                        throw new Error('Password Cannot Be Empty')
                    }
                }
            }
        }
    }, { sequelize })

    User.associate = function(models) {
        User.hasMany(models.Todo)
    };
    return User;
};