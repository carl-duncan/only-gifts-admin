// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Deduction, Profile, Disbursement, Donation } = initSchema(schema);

export {
  Deduction,
  Profile,
  Disbursement,
  Donation
};