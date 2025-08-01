module.exports = (sequelize, DataTypes) => {
const Donor = sequelize.define('Donor', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    donatedValue: DataTypes.INTEGER
  },
  {
    timestamps: true,
  });
  return Donor;
};