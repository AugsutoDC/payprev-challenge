import Sequelize, { Model } from 'sequelize';

class TeamDeveloper extends Model {
  static init(sequelize) {
    super.init(
      {
        tag: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Team, { foreignKey: 'team_id', as: 'team' });
    this.belongsTo(models.Developer, {
      foreignKey: 'developer_id',
      as: 'developer',
    });
  }
}

export default TeamDeveloper;
