import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerDeduction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Deduction, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reason: string;
  readonly percent?: number | null;
  readonly flat_amount?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDeduction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Deduction, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reason: string;
  readonly percent?: number | null;
  readonly flat_amount?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Deduction = LazyLoading extends LazyLoadingDisabled ? EagerDeduction : LazyDeduction

export declare const Deduction: (new (init: ModelInit<Deduction>) => Deduction) & {
  copyOf(source: Deduction, mutator: (draft: MutableModel<Deduction>) => MutableModel<Deduction> | void): Deduction;
}

type EagerProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Profile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly display_name?: string | null;
  readonly user_name: string;
  readonly balance: number;
  readonly currency: string;
  readonly url?: string | null;
  readonly bio?: string | null;
  readonly user_id: string;
  readonly token?: string | null;
  readonly banned?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Profile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly display_name?: string | null;
  readonly user_name: string;
  readonly balance: number;
  readonly currency: string;
  readonly url?: string | null;
  readonly bio?: string | null;
  readonly user_id: string;
  readonly token?: string | null;
  readonly banned?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Profile = LazyLoading extends LazyLoadingDisabled ? EagerProfile : LazyProfile

export declare const Profile: (new (init: ModelInit<Profile>) => Profile) & {
  copyOf(source: Profile, mutator: (draft: MutableModel<Profile>) => MutableModel<Profile> | void): Profile;
}

type EagerDisbursement = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Disbursement, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly amount: string;
  readonly user_id: string;
  readonly currency: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDisbursement = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Disbursement, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly amount: string;
  readonly user_id: string;
  readonly currency: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Disbursement = LazyLoading extends LazyLoadingDisabled ? EagerDisbursement : LazyDisbursement

export declare const Disbursement: (new (init: ModelInit<Disbursement>) => Disbursement) & {
  copyOf(source: Disbursement, mutator: (draft: MutableModel<Disbursement>) => MutableModel<Disbursement> | void): Disbursement;
}

type EagerDonation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Donation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly amount: string;
  readonly user_id: string;
  readonly currency: string;
  readonly message?: string | null;
  readonly name?: string | null;
  readonly payment_intent_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDonation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Donation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly amount: string;
  readonly user_id: string;
  readonly currency: string;
  readonly message?: string | null;
  readonly name?: string | null;
  readonly payment_intent_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Donation = LazyLoading extends LazyLoadingDisabled ? EagerDonation : LazyDonation

export declare const Donation: (new (init: ModelInit<Donation>) => Donation) & {
  copyOf(source: Donation, mutator: (draft: MutableModel<Donation>) => MutableModel<Donation> | void): Donation;
}