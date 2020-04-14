
module.exports = function(sequelize, DataTypes) {
    var Inventory = sequelize.define("Inventory", {
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
        },
        onHand: {
            type: DataTypes.INTEGER(3)
        },
        forSale: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
    Inventory.associate = function(models) {
        Inventory.belongsTo(models.User, {

        }),
        Inventory.belongsTo(models.Storefront, {

        });
    };
    
    return Inventory;
}