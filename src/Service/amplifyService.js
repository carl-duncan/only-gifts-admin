import { DataStore, Predicates } from 'aws-amplify';
import { Deduction, Disbursement, Donation, DonationStatus, Profile, Statistic } from '../models';
import axios from 'axios';

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
    let risk_profiles = [];
    for (let i = 0; i < donations.length; i++) {
      let profile = await getProfileById(donations[i].user_id);
      let risk_profile = await getRiskLevel(donations[i].payment_intent_id);
      profiles.push(profile);
      risk_profiles.push(risk_profile);
    }

    return {
      donations: donations,
      profiles: profiles,
      risk_profiles: risk_profiles,
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

export async function getStatistics() {
  try {
    return {
      statistics: await DataStore.query(Statistic),
  }
  }catch (error) {
    console.error(error);
  }
}

export async function getRiskLevel(paymentIntentId) {
  const response = await axios.post('https://thko2dsyse4xnkevukfscjhuky0zxcis.lambda-url.us-east-1.on.aws/', {
    paymentIntentId: paymentIntentId
  });

  return response.data;
}

export async function saveDonation(donation) {
  try {
    await DataStore.save(
      donation);
  } catch (error) {
    console.error(error);
  }
}

export const updateProfileBalance = async (user_id, amount) => {
  let profile = await getProfileByUserId(user_id);

  let deductions = await DataStore.query(Deduction);

  let netAmount = amount;
  await updateStatistic('total-transactions', 1);
  await updateStatistic('gmv', amount);

  for (const deduction of deductions) {
    let totalDeduction = (amount * deduction.percent) + deduction.flat_amount;
    netAmount -= totalDeduction;
    await updateStatistic('total-revenue', totalDeduction);
  }

  await DataStore.save(
    Profile.copyOf(profile, updated => {
      updated.balance = updated.balance + netAmount;
    }));

  await sendNotification(profile.token, amount);
};

export const getProfileByUserId = async (userId) => {
  const profiles = await DataStore.query(Profile,
    (c) => c.user_id.eq(userId));

  return profiles[0];
};

export const updateStatistic = async (code, value) => {
  const statistics = await DataStore.query(Statistic,
    (c) => c.code.eq(code));

  const statistic = statistics.length > 0 ? statistics[0] : null;

  if (statistic == null) {
    return false;
  }

  await DataStore.save(
    Statistic.copyOf(statistic, updated => {
      updated.value = statistic.value + value;
    }));

  return true;
};


export const sendNotification = async (deviceToken, amount) => {
  const url = 'https://fcm.googleapis.com/fcm/send';
  const serverKey = 'AAAAJBKYgbQ:APA91bHs91binTXJvop9aiag8M3jT4ITWvRYHNZPhNGrl-vqb1BIOU39-yL-RhOHCGnTCoiK-RNhOCTzaO6U2Ct8zEd0_8cy0_X1rmoc4NhgLyvS6GeOCtFMO2Df4VQeLmDKQi_mD3TO';

  axios({
    method: 'post',
    url: url,
    headers: {
      'Authorization': `key=${serverKey}`,
      'Content-Type': 'application/json',
    },
    data: {
      notification: {
        title: 'New Gift : $' + amount,
        body: 'You have received a gift of $' + amount,
      },
      to: deviceToken,
    },
  }).then(response => {
    console.log('Notification sent successfully', response);
  }).catch(error => {
    console.log('Error sending notification', error);
  });
};

