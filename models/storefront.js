module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD
    var Storefront = sequelize.define("Inventory", {
        location: {
            type: DataTypes.STRING,
=======
    var Storefront = sequelize.define("Storefront", {
        latitude: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        longitude: {
            type: DataTypes.DECIMAL,
>>>>>>> 304a57952b9b88ebb1518a5951d0e67d4c5b9e4b
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

<<<<<<< HEAD
    return Storefront
=======
    return Storefront;
>>>>>>> 304a57952b9b88ebb1518a5951d0e67d4c5b9e4b
}