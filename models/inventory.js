
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
            type: DataTypes.BOOLEAN
        }

    });
    Inventory.associate = function(models) {
        Inventory.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    
    return Inventory;
}