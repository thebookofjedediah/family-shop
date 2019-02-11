"use strict";
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define(
    "Item",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isBought: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};
