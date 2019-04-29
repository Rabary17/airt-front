import { Profile } from './profile.model';

export interface Ticket {
  slug: string;
  title: string;
  status: string;
  body: string;
  source: string;
  cause: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
