export interface ISignupResponse {
  Signup: {
    id: string;
    createdTimestamp: number;
    username: string;
    enabled: boolean;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    email: string;
    requiredActions: any[];
    notBefore: number;
    access: Access;
    attributes: null;
  };
}

export interface Access {
  manageGroupMembership: boolean;
  view: boolean;
  mapRoles: boolean;
  impersonate: boolean;
  manage: boolean;
}
