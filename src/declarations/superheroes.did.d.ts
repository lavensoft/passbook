import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface NFTSale {
  'balanceOf' : ActorMethod<[Principal], bigint>,
  'burnToken' : ActorMethod<[bigint], TxReceipt>,
  'checkinTicket' : ActorMethod<[string, Principal], string>,
  'clearAllTokens' : ActorMethod<[], undefined>,
  'createAccount' : ActorMethod<
    [string, string, bigint, string, string, string],
    UserInfoExt,
  >,
  'deleteAccount' : ActorMethod<[Principal], boolean>,
  'getAllTokens' : ActorMethod<[], Array<TokenInfoExt>>,
  'getTokenInfo' : ActorMethod<[string], TokenInfoExt>,
  'getUserInfo' : ActorMethod<[Principal], [] | [UserInfoExt]>,
  'logoToken' : ActorMethod<[], string>,
  'mintCloneNFT' : ActorMethod<[string, string], TokenInfoExt>,
  'mintNFT' : ActorMethod<[TokenInfoExt], TokenInfoExt>,
  'mintToken' : ActorMethod<[Principal, bigint], bigint>,
  'nameToken' : ActorMethod<[], string>,
  'readAccount' : ActorMethod<[], Array<UserInfoExt>>,
  'symbolToken' : ActorMethod<[], string>,
  'transferToken' : ActorMethod<[Principal, bigint], TxReceipt>,
  'transferTokenFrom' : ActorMethod<[Principal, Principal, bigint], TxReceipt>,
  'updateAccount' : ActorMethod<
    [Principal, string, string, bigint, string, string, string, bigint],
    UserInfoExt,
  >,
}
export interface TokenGiftInfo {
  'id' : string,
  'name' : string,
  'createdBy' : Principal,
  'description' : string,
  'image' : string,
  'price' : bigint,
}
export interface TokenInfoExt {
  'id' : string,
  'dateCreated' : string,
  'owner' : Principal,
  'date' : string,
  'name' : string,
  'createdBy' : Principal,
  'time' : string,
  'description' : string,
  'gifts' : Array<TokenGiftInfo>,
  'nftType' : string,
  'details' : string,
  'category' : string,
  'image' : string,
  'place' : string,
  'price' : bigint,
}
export type TxReceipt = { 'Ok' : bigint } |
  {
    'Err' : { 'InsufficientAllowance' : null } |
      { 'InsufficientBalance' : null } |
      { 'ErrorOperationStyle' : null } |
      { 'Unauthorized' : null } |
      { 'LedgerTrap' : null } |
      { 'ErrorTo' : null } |
      { 'Other' : string } |
      { 'BlockUsed' : null } |
      { 'AmountTooSmall' : null }
  };
export interface UserInfoExt {
  'id' : Principal,
  'sex' : bigint,
  'permission' : bigint,
  'dateOfBirth' : string,
  'phone' : string,
  'lastName' : string,
  'liveIn' : string,
  'firstName' : string,
}
export interface _SERVICE extends NFTSale {}
