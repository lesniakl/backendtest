export const asyncWrapper = (controller) => (req, res, next) => {
  controller(req, res).catch(next);
};

export const responseError = (error) => ({
  status: error.status,
  code: error.code,
  message: error.message,
  data: error.data,
});

export const responseData = (data, statusCode) => ({
  status: "success",
  code: statusCode,
  data,
});

export default {
  asyncWrapper,
  responseData,
  responseError,
};
