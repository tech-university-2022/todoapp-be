const _ = require('lodash');
const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user.model');
const { hashPassword } = require('../utils/security');
const fileService = require('./file.service');
const File = require('../models/file.model');

/**
 *
 * @param {{id: string; currentPassword; firstName: string; lastName: string; oldPassword: string; newPassword: string; avatar: import('../types').MulterFile}} userInfo
 */
const updateUser = async (userInfo) => {
  // check password if requires change password
  if (userInfo.newPassword) {
    const { oldPassword } = userInfo;
    if (hashPassword(oldPassword || '') !== userInfo.currentPassword) {
      return {
        error: {
          status: httpStatus.FORBIDDEN,
          message: 'Current password is incorrect',
        },
      };
    }
  }

  let createdAvatar;
  if (userInfo.avatar) {
    const avatarId = uuidv4();
    await fileService.writeFile(avatarId, userInfo.avatar);
    createdAvatar = await File.create({
      id: avatarId,
      name: userInfo.avatar.originalname,
      mime: userInfo.avatar.mimetype,
      size: userInfo.avatar.size,
      provider: 'local',
      path: `${avatarId}_${userInfo.avatar.originalname}`,
    });
  }

  await User.update(
    {
      firstName: userInfo.firstName || undefined,
      lastName: userInfo.lastName || undefined,
      password: userInfo.newPassword || undefined,
      avatar: createdAvatar ? createdAvatar.get('id') : undefined,
    },
    { where: { id: userInfo.id } }
  );

  return {
    user: _.omit((await User.findByPk(userInfo.id)).get({ plain: true }), 'password'),
  };
};

module.exports = {
  updateUser,
};
