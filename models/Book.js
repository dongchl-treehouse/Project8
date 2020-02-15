const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Oooops! Title is required',
          },
          notEmpty: {
            msg: 'Oooops! Title is required',
          },
        },
    },
    author: {
      type:Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Oooops! Author is required',
        },
        notEmpty: {
          msg: 'Oooops! Author is required',
        },
      },
    },
    genre: Sequelize.STRING,
    year: Sequelize.STRING,

 }, {sequelize });

  return Book;
};