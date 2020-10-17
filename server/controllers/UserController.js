const User = require('../Models/User');
const crypto = require('crypto');

export const getAll = async (req, res) => {
    try
    {
        let users = await User.findAll();
        res.send(users);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: ('Error en el getAll (User): ' + error)
        });
    }
}

export const add = async (req, res) => {
    try
    {        
        await User.create(req.body)
        res.status(201).send();

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: ('Error en el add (User): ' + error)
        });
    }
}

export const getById = async (req, res) => {
    try
    {
        let user = await User.findByPk(req.query.userId);

        res.send(user);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: ('Error en el getById (User): ' + error)
        });
    }
}

export const updateById = async (req, res) => {
    try
    {
        await User.update(req.body , {
            where: {
              userId: req.body.userId
            }
          });

        res.status(201).send();

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: ('Error en el getById (User): ' + error)
        });
    }
}

export const deleteById = async (req, res) => {
    try
    {
        let user = await User.findByPk(req.query.userId);

        await User.destroy({
            where: {
              userId: user.userId
            }
        });

        res.status(201).send();

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: ('Error en el getById (User): ' + error)
        });
    }
}