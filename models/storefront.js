module.exports = function (sequelize, DataTypes) {
    var Storefront = sequelize.define("Storefront", {
        latitude: {
            type: DataTypes.DECIMAL(8,6),
            allowNull: false
        },
        longitude: {
            type: DataTypes.DECIMAL(8,6),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
        },
        paymentTypes: {
            type: DataTypes.STRING,
        },
        time: {
            type: DataTypes.STRING,
        }
    });

    Storefront.associate = function (models) {
        Storefront.belongsTo(models.User, {
           
        })
        Storefront.hasMany(models.Inventory, {

        })
    }

    return Storefront;
}