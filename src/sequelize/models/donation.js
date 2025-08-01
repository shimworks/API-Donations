module.exports = (sequelize, DataTypes) => {
  const Donation = sequelize.define('Donation', {
    value: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
  },
  {
    createdAt: 'DonatedAt',
  });
  Donation.associate = (models) => {
    Donation.belongsTo(models.Donor,
      { foreingKey: 'donorId', as: 'donor' });
    };
  return Donation;
};