const User = require('../Models/User');

export const getAll = async (req, res) => {
    try
    {
        let users = await User.findAll();
        res.send(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: ('Error en el getAll (User): ' + error)
        });
    }
}

export const add = async (req, res) => {
    try
    {        
        await User.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            nickName : req.body.nickName,
            email : req.body.email,
            password : req.body.password,
            registerDate : req.body.registerDate,
            birthDate : req.body.birthDate,
            followers : req.body.followers,
            following : req.body.following,
        })

        res.send("Usuario añadido con éxito.");

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: ('Error en el add (User): ' + error)
        });
    }
}

export const getById = async (req, res) => {
    try
    {
        let user = await User.findByPk(req.query.userId);
        console.log(user);
        res.send(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: ('Error en el getById (User): ' + error)
        });
    }
}

export const updateById = async (req, res) => {
    try
    {
        let user = await User.findByPk(req.query.userId);

        user.firstName = req.body.firstName,
        user.lastName = req.body.lastName,
        user.nickName = req.body.nickName,
        user.email = req.body.email,
        user.password = req.body.password,
        user.registerDate = req.body.registerDate,
        user.birthDay = req.body.birthDate,
        user.followers = req.body.followers,
        user.following = req.body.following,

        await user.Save();

        res.send("Usuario actualizado con éxito.");

    } catch (error) {
        console.log(error);
        res.status(500).json({
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

        res.send("Usuario eliminado con éxito.");

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: ('Error en el getById (User): ' + error)
        });
    }
}