import { Document } from 'mongoose';

export interface Group extends Document {
  groupID: string;
  name: string;
  permissions: Record<any, any>;
}

export interface Bool {
  add: boolean;
  delete: boolean;
  edit: boolean;
  watch: boolean;
}

export interface Permissions {
  groups: Bool;
  pages: Bool;
  users: Bool;
}
