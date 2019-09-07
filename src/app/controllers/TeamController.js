import * as Yup from 'yup';
import Team from '../models/Team';
import TeamDeveloper from '../models/TeamDeveloper';
import Developer from '../models/Developer';

class TeamController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const teams = await Team.findAll({
      where: {
        user_id: req.userId,
      },
      order: ['name'],
      attributes: ['id', 'name'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: TeamDeveloper,
          as: 'team_developer',
          attributes: ['id', 'tag'],
          order: ['tag'],
          include: [
            {
              model: Developer,
              as: 'developer',
              attributes: ['login', 'name', 'bio', 'location', 'html_url'],
            },
          ],
        },
      ],
    });

    return res.json(teams);
  }

  async store(req, res) {
    /**
     * Checking if the developer has already been registered
     */
    const { name } = req.body;

    const teamExists = await Team.findOne({
      where: { name, user_id: req.userId },
    });

    if (teamExists) {
      return res.status(400).json({ error: 'Team already exists.' });
    }

    const team = await Team.create({
      name,
      user_id: req.userId,
    });

    return res.json(team);
  }

  async update(req, res) {
    /**
     * Validating Requisition Data
     */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const team = await Team.findByPk(req.params.id);

    /**
     * Check if the team exists
     */
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

    await team.update(req.body);

    return res.json(team);
  }

  async delete(req, res) {
    const team = await Team.findByPk(req.params.id);

    /**
     * Check if the team exists
     */
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

    await team.destroy();

    return res.json();
  }
}

export default new TeamController();
