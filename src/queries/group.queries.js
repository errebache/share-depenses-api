const Group = require("../database/models/group.model");

exports.getGroups = async () => await Group.find().populate("members");
exports.getGroup = async (id) => await Group.findById(id).populate("members");

const getGroup = exports.getGroup;


const checkMembersExist = async (groupId, membersId) => {
  const group = await Group.findOne({ _id: groupId, members: { $all: membersId } });
  if (!group) {
    const missingMembersId = membersId.filter(id => !group.members.includes(id));
    throw new Error(
      `Les utilisateurs avec les ID suivants ne sont pas membres du groupe: ${missingMembersId.join(', ')}`
    );
  }
};

exports.createGroup = async (data) => {
  data.creator = data.userId;
  let group = await Group.create(data);
  await addMemberToGroup(group._id, data.userId);
  return group;
};

exports.deleteGroup = async (id) => Group.findByIdAndRemove(id);

exports.addMemberToGroup = async (groupId, userId) => {
  console.log(groupId);
  let group = await getGroup(groupId);  
  console.log(group);
  group.members.push(userId);
  await group.save();
};

exports.removeMemberFromGroup = async (groupId, memberId) => {
  await checkMembersExist(groupId, [memberId]);
  let group = await getGroup(groupId);
  // group.members = group.members.filter((m) => m != memberId);
  group.members.pull(memberId);
  await group.save();
};

exports.updateGroup = async (groupId, groupData) => {
  return await Group.findByIdAndUpdate(groupId, groupData, { new: true });
};