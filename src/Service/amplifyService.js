import { DataStore, Predicates, SortDirection } from 'aws-amplify';
import { Profile } from '../models';
export async function getUsers(page, searchValue) {
  try {
    const limit = 4;
    const predicate = searchValue === '' ? Predicates.ALL : (c) => c.user_name.contains(searchValue);
    const users = await DataStore.query(Profile,  predicate, {
      page: page - 1,
      limit: limit
    });
    const totalUsers = await DataStore.query(Profile, predicate);
    const totalPages = Math.ceil(totalUsers.length / limit);

    return {
      users: users,
      totalPages: totalPages
    };
  } catch (error) {
    console.error(error);
  }
}
