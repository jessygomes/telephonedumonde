/**
 * @module actions/account
 * @desc Ce module permet de récupérer le compte d'un user connecté avec GOOGLE
 */

import { db } from "../db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });
    return account;
  } catch (error) {
    return null;
  }
};
