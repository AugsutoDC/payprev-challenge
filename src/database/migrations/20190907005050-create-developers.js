module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('developers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bio: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      html_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('developers');
  },
};
