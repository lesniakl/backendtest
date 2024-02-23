import { asyncWrapper, responseData } from "../../helpers/apiHelpers.js";

const currentUser = async (req, res) => {
  res.status(200).json(responseData({ user: req.user }, 200));
};

export default asyncWrapper(currentUser);
