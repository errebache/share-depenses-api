const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const jsonwebtoken = require("jsonwebtoken");
const { keyPub } = require("../_config/keys");
const ErrorHandler = require("../utils/ErrorHandler");
const {
  getLists,
  addNewList,
  updateList,
  deleteList,
  getListById,
  getListDetail,
} = require("../queries/list.queries");
const { userSave, findUserByEmail, findByIdAuth } = require("../queries/auth.queries");
const ListModel = require("../database/models/list.model");
const UserModel = require("../database/models/user.model");
const GroupModel = require("../database/models/group.model");
const { invitedSave } = require("../queries/invited.queries");
const InvitedModel = require("../database/models/invited.model");

exports.getLists = async (req, res, next) => {
  console.log("List");
  try {
    const lists = await getLists();
    console.log(lists);
    res.json(lists);
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(500, "INTERNAL_SERVER_ERROR"));
  }
};

exports.listDetail = async (req, res, next) => {
  try {
    console.log(req.params.listId);
    const list = await getListDetail(req.params.listId);
    if (!list) {
      throw new ErrorHandler(404, "LIST_NOT_FOUND");
    }
    res.json(list);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, "INVALID_ID_FORMAT"));
    } else {
      next(error);
    }
  }
};

exports.addList = async (req, res, next) => {
  const { name, currency, description, createdBy, image, groups } = req.body;

  try {
    if (!Array.isArray(groups)) {
      throw new ErrorHandler(400, "Invalid groups data");
    }

   const invitedUsers = [];

   if(groups && Array.isArray(groups)){
      for (const group of groups) {
        invitedUsers.push(group); 
      }
    }

    const savedInvitedUsers = {};
    for (const invited of invitedUsers) {
      try {
        const member = await invitedSave(invited);
        savedInvitedUsers[invited.email] = member._id;
      } catch (error) {
        console.error("Error creating user:", error);
        throw new ErrorHandler(500, "Error creating user");
      }
    }

    const memberIds = groups.map((group) => savedInvitedUsers[group.email]);
    memberIds.push(createdBy._id);

    const newGroup = new GroupModel({
      members: memberIds,
      createdBy: createdBy._id,
    });

    const savedGroup = await newGroup.save();

    const newList = new ListModel({
      name,
      currency,
      description,
      group: savedGroup._id,
      createdBy,
      image: {
        original:
          "https://images.pexels.com/photos/170809/pexels-photo-170809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        large:
          "https://images.pexels.com/photos/170809/pexels-photo-170809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        medium:
          "https://images.pexels.com/photos/170809/pexels-photo-170809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        small:
          "https://images.pexels.com/photos/170809/pexels-photo-170809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
      permissions: {
        read: true,
        update: true,
        delete: false,
        image: {
          read: true,
          update: false,
          delete: false,
        },
        settles: {
          index: true,
          create: true,
        },
      },
    });

    const listSaved = await newList.save();

    res.status(201).json(listSaved);
  } catch (error) {
    next(error);
  }
};


// exports.addList = async (req, res, next) => {
//   const { name, currency, description, createdBy, image, groups } = req.body;

//   try {
//     if (!groups || !Array.isArray(groups)) {
//       throw new ErrorHandler(400, "Invalid groups data");
//     }
//     if (groups && Array.isArray(groups)) {
//       const promises = groups.map(async (member) => {
//         let user = await findUserByEmail(member.email);
//         if (!user) {
//           try {
//             user = userSave(member);
//           } catch (error) {
//             console.error("Error creating user:", error);
//             throw new ErrorHandler(500, "Error creating user");
//           }
//         }
//         return user;
//       });
//       const allMembers = await Promise.all(promises);
//       const memberIds = allMembers.map((user) => user._id);

//       const newGroup = new GroupModel({
//         name: "Nom du groupe",
//         description: "Description du groupe",
//         members: memberIds,
//         createdBy: createdBy._id,
//       });

//       const savedGroup = await newGroup.save();

//       const newList = new ListModel({
//         name,
//         currency,
//         description,
//         //group: savedGroup._id,
//         createdBy,
//         image: {
//           original:
//             "https://images.pexels.com/photos/170809/pexels-photo-170809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           large:
//             "https://images.pexels.com/photos/170809/pexels-photo-170809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           medium:
//             "https://images.pexels.com/photos/170809/pexels-photo-170809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//           small:
//             "https://images.pexels.com/photos/170809/pexels-photo-170809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//         },
//         permissions: {
//           read: true,
//           update: true,
//           delete: false,
//           image: {
//             read: true,
//             update: false,
//             delete: false,
//           },
//           settles: {
//             index: true,
//             create: true,
//           },
//         },
//       });

//       const listSaved = await newList.save();
//       res.status(201).json(newList);
//     //}
//   } catch (error) {
//     next(error);
//   }
// };

exports.editList = async (req, res, next) => {
  try {
    const updatedList = await updateList(req.params.listId, req.body);
    if (!updatedList) {
      throw new ErrorHandler(404, "LIST_NOT_FOUND");
    }
    res.json(updatedList);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, "INVALID_ID_FORMAT"));
    } else {
      next(error);
    }
  }
};

exports.deleteList = async (req, res, next) => {
  const listId = req.params.listId;
    try {
      const list = await ListModel.findById(listId);
    if (!list) {
      throw new Error(`List with ID ${listId} not found`);
    }

    // Récupérer l'ID du groupe associé à la liste
    const groupId = list.group;

    // Récupérer les membres du groupe
    const group = await GroupModel.findById(groupId);
    if (!group) {
      throw new Error(`Group with ID ${groupId} not found`);
    }
    const memberIds = group.members;

    // Supprimer les utilisateurs associés au groupe
    await InvitedModel.deleteMany({ _id: { $in: memberIds } });

    // Supprimer le groupe lui-même
    await GroupModel.findByIdAndDelete(groupId);
    const deleted = await deleteList(req.params.listId);
    if (!deleted) {
      throw new ErrorHandler(404, "LIST_NOT_FOUND");
    }
    res.status(204).end();
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, "INVALID_ID_FORMAT"));
    } else {
      next(error);
    }
  }
};

exports.getListsById = async (req, res, next) => {
  try {
    lists = await getListById(req.params.listId);
    console.log(lists);
    res.json(lists);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      next(new ErrorHandler(400, "INVALID_ID_FORMAT"));
    } else {
      next(error);
    }
  }
};
