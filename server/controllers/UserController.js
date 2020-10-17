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
            firstName : req.query.firstName,
            lastName : req.query.lastName,
            nickName : req.query.nickName,
            email : req.query.email,
            password : req.query.password,
            dni : req.query.dni,
            registerDate : req.query.registerDate,
            birthDate : req.query.birthDay,
            followers : req.query.followers,
            following : req.query.following,
        })
        .then(console.log("Usuario añadido con exito."))

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: ('Error en el getAll (User): ' + error)
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
        res.status(500).json({
            message: ('Error en el getById (User): ' + error)
        });
    }
}

export const updateById = async (req, res) => {
    try
    {
        let user = await User.findByPk(req.query.userId);

        user.firstName = req.query.firstName,
        user.lastName = req.query.lastName,
        user.nickName = req.query.nickName,
        user.email = req.query.email,
        user.password = req.query.password,
        user.dni = req.query.dni,
        user.registerDate = req.query.registerDate,
        user.birthDay = req.query.birthDay,
        user.followers = req.query.followers,
        user.following = req.query.following,

        await user.Save();

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

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: ('Error en el getById (User): ' + error)
        });
    }
}