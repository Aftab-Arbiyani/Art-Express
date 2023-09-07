import { rateLimit } from "express-rate-limit";

import response from "../utils/response";

const apiLimiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    return response.tooManyRequest(res);
  },
});

export default apiLimiter;
