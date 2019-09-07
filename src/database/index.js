import Sequelize from 'sequelize';

import User from '../app/models/User';
import Team from '../app/models/Team';
import Developer from '../app/models/Developer';
import TeamDeveloper from '../app/models/TeamDeveloper';

import databaseConfig from '../config/database';

const models = [User, Team, Developer, TeamDeveloper];

class Database {
  constructor() {
    this.init();
    this.associate();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }

  associate() {
    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
