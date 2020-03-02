'use strict';
/**
 * @swagger
 *  components:
 *    schemas:
 *      ToDo:
 *        type: object
 *        required:
 *          - title
 *          - description
 *          - status
 *          - due_date
 *        properties:
 *          title:
 *            type: string
 *            description: Title of the todo task
 *          description:
 *            type: string
 *          status:
 *            type: string
 *            description: Uncomplete/Complete
 *          due_date:
 *            type: Date
 *          createdAt:
 *            type: Date
 *          updatedAt:
 *            type: Date
 *        example:
 *          title: Do Laundry
 *          description: Use Washing Machine
 *          status: Uncomplete
 *          due_date: 2020-10-10T00:00:00.000Z
 *          createdAt: 2020-10-10T00:00:00.000Z
 *          updatedAt: 2020-10-10T00:00:00.000Z
 */
module.exports = (sequelize, DataTypes) => {
  const ToDo = sequelize.define('ToDo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "please enter ToDo title"
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: DataTypes.DATE
  }, {});
  ToDo.associate = function(models) {
    // associations can be defined here
  };
  return ToDo;
};