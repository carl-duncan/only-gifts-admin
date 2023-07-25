import { DataStore, Predicates } from 'aws-amplify';
import { Disbursement, Donation, DonationStatus, Profile } from '../models';

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

export async function getDonations(page, userId, status) {
  try {
    const limit = 8;
    let statusEnum = null;
    if (status === 'pending') {
      statusEnum = DonationStatus.PENDING;
    }
    if (status === 'completed') {
      statusEnum = DonationStatus.COMPLETED;
    }

    if (status === 'rejected') {
      statusEnum = DonationStatus.REJECTED;
    }
    const predicate = userId === null && status === null ? Predicates.ALL : userId === null && status !== null ? (c) => c.status.eq(statusEnum) : userId !== null && status === null ? (c) => c.user_id.eq(userId) : (c) => c.user_id.eq(userId).and(c.status.eq(statusEnum));
    const donations = await DataStore.query(Donation,  predicate, {
      page: page - 1,
      limit: limit
    });
    const totalDonations = await DataStore.query(Donation, predicate);
    const totalPages = Math.ceil(totalDonations.length / limit);

    let profiles = [];
    for (let i = 0; i < donations.length; i++) {
      let profile = await getProfileById(donations[i].user_id);
      profiles.push(profile);
    }

    return {
      donations: donations,
      profiles: profiles,
      totalPages: totalPages,
      totalDonations: totalDonations.length
    };
  } catch (error) {
    console.error(error);
  }
}

export async function banUser(userId) {
  try {
    const profile = await DataStore.query(Profile, (c) => c.id.eq(userId));
    await DataStore.save(
      Profile.copyOf(profile[0], updated => {
        updated.banned = true
      }));
  } catch (error) {
    console.error(error);
  }
}

export async function unbanUser(userId) {
try {
    const profile = await DataStore.query(Profile, (c) => c.id.eq(userId));
    await DataStore.save(
      Profile.copyOf(profile[0], updated => {
        updated.banned = false
      }));
  } catch (error) {
    console.error(error);
  }
}

export async function getWithdrawals(page, userId) {
  try {
    const limit = 8;
    const predicate = userId === null ? Predicates.ALL : (c) => c.user_id.eq(userId);
    const withdrawals = await DataStore.query(Disbursement,  predicate, {
      page: page - 1,
      limit: limit
    });
    const totalWithdrawals = await DataStore.query(Disbursement, predicate);
    const totalPages = Math.ceil(totalWithdrawals.length / limit);

    let profiles = [];
    for (let i = 0; i < withdrawals.length; i++) {
      let profile = await getProfileById(withdrawals[i].user_id);
      profiles.push(profile);
    }

    return {
      withdrawals: withdrawals,
      profiles: profiles,
      totalPages: totalPages,
      totalWithdrawals: totalWithdrawals.length
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getProfileById(userId) {
  try {
    const profile = await DataStore.query(Profile, (c) => c.user_id.eq(userId));
    return profile[0];
  } catch (error) {
    console.error(error);
  }
}