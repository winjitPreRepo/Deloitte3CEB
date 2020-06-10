import { SortByList } from '../globle.constants'

export class ApplicationUser {
  UserId?: number
  FirstName?: string
  LastName?: string
  Email?: string
  UserName?: string
  IdentityId?: string
  IsActive?: boolean
  CreatedBy?: number
  CreaatedDate?: Date
  ModifiedBy?: number
  ModifiedDate?: Date
  Password?: string
}

export class UserAccountRegistration {
  userName?: string
  isAccountCreated?: boolean
  message?:string
}


export class ChangePasswordResponse {
  userName?: string
  isPasswordChanged?: boolean
  message?:string
}

export class UserTimeStamp {
  userId?: number;
}

export class UserConcurrentLogin {
  sessionId?:number;
  userId?: number;
  jwtToken?: string;
  loginTimeStamp?: string;
  TokenExpiryTimeStamp?: string;
  IsLogin?: boolean;
  IsActive?: boolean;
  LogOutTimeStamp?: string;
}

export class FilterModel {
  constructor() {
      this.searchText = '';
      this.categories = [];
      this.sortBy = SortByList.DescendingByRating;
      this.startIndex = 0;
      this.userId = 0;
  }
  sortBy?: string;
  searchText?: string;
  categories?: number[];
  limit?: number;
  size?: number;
  startIndex?: number;
  categorySize?: number;
  userId?: number;
}