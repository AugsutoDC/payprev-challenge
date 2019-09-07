import * as Yup from 'yup';
import axios from 'axios';
import Developer from '../models/Developer';
import User from '../models/User';

class DeveloperController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const developers = await Developer.findAll({
      order: ['name'],
      attributes: ['id', 'name', 'login', 'bio', 'location', 'html_url'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(developers);
  }

  async show(req, res) {
    const developer = await Developer.findByPk(req.params.id);

    if (!developer) {
      return res.status(400).json({ error: 'Developer not found.' });
    }

    return res.json(developer);
  }

  async store(req, res) {
    /**
     * Checks if the logged in user is admin
     */
    const checkUserAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!checkUserAdmin) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    /**
     * Validating Requisition Data
     */
    const schema = Yup.object().shape({
      username: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { username } = req.body;

    /**
     * Checking if the developer has already been registered
     */
    const devExists = await Developer.findOne({ where: { login: username } });

    if (devExists) {
      return res.status(400).json({ error: 'Developer already exists.' });
    }

    /**
     * Fetching data from github api
     */

    const githubResponse = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const { name, login, bio, location, html_url } = githubResponse.data;

    if (!login) {
      return res.status(400).json({ error: 'Developer not found.' });
    }

    const developer = await Developer.create({
      name,
      login,
      bio,
      location,
      html_url,
    });

    return res.json(developer);
  }

  async delete(req, res) {
    /**
     * Checks if the logged in user is admin
     */
    const checkUserAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!checkUserAdmin) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    /**
     * Checking if the developer has already been registered
     */
    const developer = await Developer.findByPk(req.params.id);

    if (!developer) {
      return res.status(404).json({ error: 'Developer does not exists.' });
    }

    await developer.destroy();

    return res.json();
  }
}

export default new DeveloperController();
