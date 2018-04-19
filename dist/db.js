'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Conn = new _sequelize2.default('cs4690', 'postgres', 'password', {
    dialect: 'postgres',
    host: 'localhost'
});

var Owner = Conn.define('owner', {
    name: {
        type: _sequelize2.default.STRING,
        allowNull: false
    },
    address: {
        type: _sequelize2.default.STRING,
        allowNull: false
    },
    phone: {
        type: _sequelize2.default.STRING,
        allowNull: false
    }
});

var Dog = Conn.define('dog', {
    name: {
        type: _sequelize2.default.STRING,
        allowNull: false
    },
    breed: {
        type: _sequelize2.default.STRING,
        allowNull: false
    },
    age: {
        type: _sequelize2.default.INTEGER,
        allowNull: false
    },
    has_shots: {
        type: _sequelize2.default.BOOLEAN,
        allowNull: false
    }
});

var dogsToOwners = Conn.define('dogsToOwners', {
    dogId: {
        type: _sequelize2.default.INTEGER,
        allowNull: false
    },
    ownerId: {
        type: _sequelize2.default.INTEGER,
        allowNull: false
    }
});

// Relations
Owner.belongsToMany(Dog, { through: 'dogsToOwners' });
Dog.belongsToMany(Owner, { through: 'dogsToOwners' });

Conn.sync({ force: true }).then(function () {
    _lodash2.default.times(10, function () {
        return Dog.create({
            name: _faker2.default.name.firstName(),
            breed: "Lab",
            age: _faker2.default.random.number() % 20 + 1,
            has_shots: _faker2.default.random.boolean()
        });
    });
    _lodash2.default.times(5, function () {
        return Owner.create({
            name: _faker2.default.name.findName(),
            address: _faker2.default.address.streetAddress(),
            phone: _faker2.default.phone.phoneNumber()
        }).then(function (owner) {
            var num = _faker2.default.random.number() % 10 + 1;
            Dog.findOne({ where: { id: num } }).then(function (dog) {
                owner.addDog(dog).then(function (result) {}, function (error) {
                    console.log(error);
                });
            });
            var num2 = (num + 1) % 10;
            Dog.findOne({ where: { id: num2 } }).then(function (dog) {
                owner.addDog(dog).then(function (result) {}, function (error) {
                    console.log(error);
                });
            });
        });
    });
});

exports.default = Conn;
//# sourceMappingURL=db.js.map