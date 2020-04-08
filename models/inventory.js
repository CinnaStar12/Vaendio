module.exports = function(sequelize, DataTypes) {
    var Inventory = sequelize.define("Inventory", {
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        price: {
            type: DataTypes.DECIMAL,
        },
        onHand: {
            type: DataTypes.INTEGER
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