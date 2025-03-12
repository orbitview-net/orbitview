export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  date_joined: string;
}

export interface Company {
  id: number;
  logo: string;
  description: string;
  website: string;
  type: 'CORP' | 'CLUB';
}

export interface Experience {
  title: string;
  type: 'WORK' | 'CLUB';
  employment_type: 'SELF_EMPLOYED' | 'FREELANCE' | 'FULL_TIME' | 'PART_TIME';
  company: Company;
  start_date: string;
  end_date: string | null;
}

export interface Profile {
  id: number;
  user: User;
  date_of_birth: string;
  byline: string;
  profile_pic: string;
  membership: string;
  website: string;
  linkedin: string;
  external_links: string[] | null;
  experiences: Experience[];
}

export interface Organization {
  id: number;
  logo: string;
  description: string;
  website: string;
  external_links: string[] | null;
  type: 'CORP' | 'CLUB';
}