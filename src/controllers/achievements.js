import { asyncWrapper, responseData } from "../helpers/apiHelpers.js";
import { achievements as service } from "../services/index.js";

const getAchievements = async (req, res) => {
  const { id } = req.user;
  const result = await service.achievements(id);

  res.json(
    responseData(
      {
        result,
      },
      200
    )
  );
};

export const get = asyncWrapper(getAchievements);
