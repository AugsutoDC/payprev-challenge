import Sequelize, { Model } from 'sequelize';

class Developer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        login: Sequelize.STRING,
        bio: Sequelize.STRING,
        location: Sequelize.STRING,
        html_url: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Developer;
