import Sequelize, { Model } from 'sequelize';

class Team extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.hasMany(models.TeamDeveloper, {
      foreignKey: 'team_id',
      as: 'team_developer',
    });
  }
}

export default Team;
