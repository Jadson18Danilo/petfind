module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'telefone', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'cidade', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'estado', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'avatar', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'telefone');
    await queryInterface.removeColumn('users', 'cidade');
    await queryInterface.removeColumn('users', 'estado');
    await queryInterface.removeColumn('users', 'avatar');
  },
};
