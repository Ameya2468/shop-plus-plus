import { signUpUser } from "../../controllers/user.js";

export default async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password,phone,address } = req.body;
    const { user, token } = await signUpUser({ name, email, password,phone,address});
    res.json({ user, token });
  } catch (error) {
    res.status(403).json(error);
  }
};