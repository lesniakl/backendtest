import { asyncWrapper } from "../../helpers/apiHelpers.js";
import { auth as service } from "../../services/index.js";

const logout = async (req, res) => {
  const { id } = req.user;

  await service.logout(id);

  res.sendStatus(204);
};

export default asyncWrapper(logout);
