import { DataStore, Predicates } from 'aws-amplify';
import { Donation, Profile } from '../models';
export async function getUsers(page, searchValue) {
  try {
    const limit = 5;
    const predicate = searchValue === '' ? Predicates.ALL : (c) => c.user_name.contains(searchValue);
    const users = await DataStore.query(Profile,  predicate, {
      page: page - 1,
      limit: limit
    });
    const totalUsers = await DataStore.query(Profile, predicate);
    const totalPages = Math.ceil(totalUsers.length / limit);

    return {
      users: users,
      totalPages: totalPages,
      totalUsers: totalUsers.length
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getDonations(page, userId) {
  try {
    const limit = 8;
    const predicate = userId === null ? Predicates.ALL : (c) => c.user_id.eq(userId);
    const donations = await DataStore.query(Donation,  predicate, {
      page: page - 1,
      limit: limit
    });
    const totalDonations = await DataStore.query(Donation, predicate);
    const totalPages = Math.ceil(totalDonations.length / limit);

    return {
      donations: donations,
      totalPages: totalPages,
      totalDonations: totalDonations.length
    };
  } catch (error) {
    console.error(error);
  }
}