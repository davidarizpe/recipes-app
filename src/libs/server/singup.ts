"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (values: {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}) => {
  let newUser;
  try {
    const equalEmail = await prisma.users.findFirst({
      where: {
        email: values.email,
      },
    });

    const equalUsername = await prisma.users.findFirst({
      where: {
        username: values.username,
      },
    });

    if (equalEmail || equalUsername) {
      return { success: false, message: "Username or email already exists" };
    }

    newUser = await prisma.users.create({
      data: {
        name: `${values.firstname} ${values.lastname}`,
        username: values.username || `${values.firstname}${values.lastname}`,
        email: values.email,
        password: values.password,
      },
    });
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error creating user" };
  }

  return { success: true, message: "User created successfully", user: newUser };
};

export default createUser;
