import { BadRequest } from "../errors";
import validator from "validator";

const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 4;

export const verifyEmail = (email: string | undefined, index?: number): void => {
  if (!email) {
    throw new BadRequest(`Please provide email${index !== undefined ? " at index: " + index : ""}`);
  }

  if (typeof email !== "string") {
    throw new BadRequest(
      `Email needs to be of type: string${index !== undefined ? " at index: " + index : ""}`,
    );
  }

  const isValid = validator.isEmail(email);
  if (!isValid) {
    throw new BadRequest(`Email is invalid${index !== undefined ? " at index: " + index : ""}`);
  }
  return;
};

export const verifyName = (name: string | undefined, index?: number): void => {
  if (!name) {
    throw new BadRequest(`Please provide name${index !== undefined ? " at index: " + index : ""}`);
  }

  if (typeof name !== "string") {
    throw new BadRequest(
      `Name needs to be of type: string${index !== undefined ? " at index: " + index : ""}`,
    );
  }

  const isValid: boolean = name.length >= MIN_NAME_LENGTH;
  if (!isValid) {
    throw new BadRequest(
      `Name must be at least ${MIN_NAME_LENGTH} characters long${index !== undefined ? " at index: " + index : ""}`,
    );
  }
  return;
};

export const verifyPassword = (password: string | undefined, index?: number): void => {
  if (!password) {
    throw new BadRequest(
      `Please provide password${index !== undefined ? " at index: " + index : ""}`,
    );
  }

  if (typeof password !== "string") {
    throw new BadRequest(
      `Password needs to be of type: string${index !== undefined ? " at index: " + index : ""}`,
    );
  }

  const isValid: boolean = password.length >= MIN_PASSWORD_LENGTH;
  if (!isValid) {
    throw new BadRequest(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters long${index !== undefined ? " at index: " + index : ""}`,
    );
  }
  return;
};
