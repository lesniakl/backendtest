import { user as service } from "../../services/index.js";
import { asyncWrapper, responseData } from "../../helpers/apiHelpers.js";
import { convertUserData } from "../../helpers/convertUserData.js";

const editProfile = async (req, res) => {
  const { id } = req.user;
  const { name: newName } = req.body;
  const { name: currentName } = req.user;
  const imageUrl = req?.file?.path;

  const updateDataObj = {};

  if (newName && newName !== currentName) {
    updateDataObj.name = newName;
  }

  if (imageUrl) {
    updateDataObj.avatarURL = imageUrl;
  }

  if (Object.keys(updateDataObj).length === 0) {
    return res.status(200).json(
      responseData(
        {
          user: req.user,
        },
        200
      )
    );
  }

  const user = await service.updateUserProfile(id, updateDataObj);

  res.status(200).json(
    responseData(
      {
        user: convertUserData(user),
      },
      200
    )
  );
};

export default asyncWrapper(editProfile);
