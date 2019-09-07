import * as Yup from 'yup';
import TeamDeveloper from '../models/TeamDeveloper';
import Developer from '../models/Developer';
import Team from '../models/Team';

class TeamDeveloperController {
  async index(req, res) {
    const team_id = req.params.teamId;
    const { page = 1 } = req.query;

    /**
     * Check if the team exists
     */

    const team = await Team.findByPk(team_id);

    if (!team) {
      return res.status(404).json({ error: 'Team does not exists.' });
    }

    /**
     * Checks if logged in user owns team
     */
    const user_id = req.userId;

    if (team.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    const TeamDevelopers = await TeamDeveloper.findAll({
      where: {
        team_id,
      },
      attributes: ['id', 'tag', 'team_id'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Developer,
          as: 'developer',
          attributes: ['login', 'name', 'bio', 'location', 'html_url'],
        },
      ],
    });
    return res.json(TeamDevelopers);
  }

  async store(req, res) {
    /**
     * Validating Requisition Data
     */
    const schema = Yup.object().shape({
      developer_id: Yup.string().required(),
      tag: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const team_id = req.params.teamId;
    const { developer_id } = req.body;

    /**
     * Check if the team exists
     */

    const team = await Team.findByPk(team_id);

    if (!team) {
      return res.status(404).json({ error: 'Team does not exists.' });
    }

    /**
     * Checks if logged in user owns team
     */
    const user_id = req.userId;

    if (team.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    /**
     * Checks if the developer exists
     */
    const developer = await Developer.findByPk(developer_id);

    if (!developer) {
      return res.status(404).json({ error: 'Developer does not exists.' });
    }

    /**
     * Checks if the developer has already been added to this team
     */
    const teamDeveloperExist = await TeamDeveloper.findOne({
      where: {
        team_id,
        developer_id,
      },
    });

    if (teamDeveloperExist) {
      return res
        .status(400)
        .json({ error: 'The developer has already been added to the team.' });
    }

    const teamDeveloper = await TeamDeveloper.create({
      team_id,
      developer_id,
      tag: req.body.tag || null,
    });

    return res.json(teamDeveloper);
  }

  async update(req, res) {
    /**
     * Validating Requisition Data
     */
    const schema = Yup.object().shape({
      tag: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const team_id = req.params.teamId;

    /**
     * Check if the team exists
     */

    const team = await Team.findByPk(team_id);

    if (!team) {
      return res.status(404).json({ error: 'Team does not exists.' });
    }

    /**
     * Checks if logged in user owns team
     */
    const user_id = req.userId;

    if (team.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    /**
     * Checks if the team-developer exists
     */
    const teamDeveloper = await TeamDeveloper.findOne({
      where: {
        id: req.params.id,
        team_id,
      },
    });

    if (!teamDeveloper) {
      return res
        .status(404)
        .json({ error: 'Developer does not exists in this team.' });
    }

    await teamDeveloper.update({ tag: req.body.tag });

    return res.json(teamDeveloper);
  }

  async delete(req, res) {
    const team_id = req.params.teamId;

    /**
     * Check if the team exists
     */

    const team = await Team.findByPk(team_id);

    if (!team) {
      return res.status(404).json({ error: 'Team does not exists.' });
    }

    /**
     * Checks if logged in user owns team
     */
    const user_id = req.userId;

    if (team.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    /**
     * Checks if the team-developer exists
     */
    const teamDeveloper = await TeamDeveloper.findOne({
      where: {
        id: req.params.id,
        team_id,
      },
    });

    if (!teamDeveloper) {
      return res
        .status(404)
        .json({ error: 'Developer does not exists in this team.' });
    }

    await teamDeveloper.destroy();

    return res.json();
  }
}

export default new TeamDeveloperController();
