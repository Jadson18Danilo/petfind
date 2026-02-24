module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('messages', 'isRead', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('messages', 'isRead');
  },
};
