module.exports = function(sequelize, DataTypes) {
    var Storefront = sequelize.define("Inventory", {
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        paymentTypes: {
            type: DataTypes.STRING,
        },
        time: {
            type: DataTypes.STRING,
        }
    });
    Storefront.associate = function(models) {
        Storefront.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Storefront
}