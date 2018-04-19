import Sequelize from 'sequelize';
import Faker from 'faker';
import _ from 'lodash';

const Conn = new Sequelize(
    'cs4690',
    'postgres',
    'password',
    {
        dialect: 'postgres',
        host: 'localhost'
    }
);

const Owner = Conn.define('owner', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Dog = Conn.define('dog', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    breed: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    has_shots: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

const dogsToOwners = Conn.define('dogsToOwners', {
    dogId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// Relations
Owner.belongsToMany(Dog, {through: 'dogsToOwners'});
Dog.belongsToMany(Owner, {through: 'dogsToOwners'});

Conn.sync({ force: true }).then(()=> {
    _.times(10, () => {
        return Dog.create({
            name: Faker.name.firstName(),
            breed: "Lab",
            age: Faker.random.number() % 20 + 1,
            has_shots: Faker.random.boolean(),
        });
    });
    _.times(5, () => {
        return Owner.create({
            name: Faker.name.findName(),
            address: Faker.address.streetAddress(),
            phone: Faker.phone.phoneNumber()
        }).then((owner) => {
            let num = Faker.random.number() % 10 + 1;
            Dog.findOne({ where: { id: num  } }).then(dog => {
                owner.addDog(dog).then((result) => {
                }, (error) => {
                    console.log(error);
                });
            });
            let num2 = (num + 1) % 10;
            Dog.findOne({ where: { id: num2 } }).then(dog => {
                owner.addDog(dog).then((result) => {}, (error) => {
                    console.log(error);
                });
            });
        });
    });
});

export default Conn;