// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const DisbursementStatus = {
  "PENDING": "PENDING",
  "COMPLETED": "COMPLETED",
  "REJECTED": "REJECTED"
};

const DonationStatus = {
  "PENDING": "PENDING",
  "COMPLETED": "COMPLETED",
  "REJECTED": "REJECTED"
};

const { Statistic, BankAccount, Deduction, Profile, Disbursement, Donation } = initSchema(schema);

export {
  Statistic,
  BankAccount,
  Deduction,
  Profile,
  Disbursement,
  Donation,
  DisbursementStatus,
  DonationStatus
};