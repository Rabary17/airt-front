import { Profile } from './profile.model';
import { User } from './user.model';
import { Client } from './client.model'

export interface Ticket {
  slug: string;
  title: string;
  status: string;
  body: string;
  source: string;
  client: Client;
  technician: User;
  cause: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
