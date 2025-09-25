// transfer.service.js
import { createTransferInRepository, getTransfersFromRepository } from "./transfer.repository.js";
import { patchAccount } from "../account/account.repository.js";

export async function createTransfer(data) {
  const { fromAccountId, toAccountId, amount, currency, userId } = data;

  if (!fromAccountId || !toAccountId || !amount || !currency || !userId) {
    throw new Error("Missing required fields for transfer");
  }

  if (amount <= 0) {
    throw new Error("Transfer amount must be positive");
  }

  if (amount > 10000) { 
    throw new Error("Insufficient funds");
  }

  await patchAccount(fromAccountId, -amount); 
  await patchAccount(toAccountId, amount);   

  return await createTransferInRepository(data);
}

export async function getTransfers(userId) {
  if (!userId) {
    throw new Error("Missing userId");
  }
  return await getTransfersFromRepository(userId);
}
