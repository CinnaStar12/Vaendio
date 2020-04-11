module.exports = function(sequelize, DataTypes) {
    var Inventory = sequelize.define("Inventory", {
<<<<<<< HEAD
        product_name: {
=======
        productName: {
>>>>>>> 304a57952b9b88ebb1518a5951d0e67d4c5b9e4b
            type: DataTypes.STRING,
            allowNull: false,

        },
        price: {
            type: DataTypes.DECIMAL,
        },
        onHand: {
<<<<<<< HEAD
            type: DataTypes.INTEGER
=======
            type: DataTypes.INTEGER(3)
>>>>>>> 304a57952b9b88ebb1518a5951d0e67d4c5b9e4b
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