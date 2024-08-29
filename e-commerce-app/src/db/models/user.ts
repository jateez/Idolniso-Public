import { AuthPayload, UserLogin, UserRegister } from "@/types/type";
import { getDBInstance } from "../config/index";
import { COLLECTION_USER } from "@/lib/constants";
import { comparePassword, hashPassword } from "../helpers/bcrypt";

export const login = async (user: UserLogin): Promise<AuthPayload> => {
  const instanceDb = await getDBInstance();

  const foundUser = await instanceDb.collection(COLLECTION_USER).findOne({ email: user.email });

  if (!foundUser) {
    throw new Error("Error, Invaid email or password. Please input the correct email and passowrd", { cause: "INVALID_CREDENTIALS" });
  }

  if (!comparePassword(user.password, foundUser.password)) {
    throw new Error("Error, Invaid email or password. Please input the correct email and passowrd", { cause: "INVALID_CREDENTIALS" });
  }

  return { _id: foundUser._id, username: foundUser.username };
};

export const addUser = async (inputUser: UserRegister) => {
  const instanceDb = await getDBInstance();

  const modifiedUser: UserRegister = {
    ...inputUser,
    password: hashPassword(inputUser.password),
  };

  const newUser = await instanceDb.collection(COLLECTION_USER).insertOne(modifiedUser);
  return newUser;
};

export const userUniqueValidation = async (email: string, username: string) => {
  const instanceDb = await getDBInstance();

  const foundUserEmail = await instanceDb.collection(COLLECTION_USER).findOne({ email });
  if (foundUserEmail) {
    console.log("error email exists");
    throw new Error("Error, email is already registered. Please login instead", { cause: "EMAIL_UNIQUE_CONSTRAINT" });
  }

  const foundUserUsername = await instanceDb.collection(COLLECTION_USER).findOne({ username });
  if (foundUserUsername) {
    console.log("error username exists");
    throw new Error("Error, username is already registered. Please login instead", { cause: "USERNAME_UNIQUE_CONSTRAINT" });
  }
};
