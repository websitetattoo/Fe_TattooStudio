export type Policies = {
  title: string;
  content: string;
  subtitle: string;
  isSubTitle: boolean;
  isImportant: boolean;
};

export type Tattoocare = {
  title: string;
  content: string;
  subtitle: string;
  isSubTitle: boolean;
  isImportant: boolean;
};

export type filterPolicesData = {
  page: number;
  pageSize?: number;
  keyWord?: string;
  sort?: string;
  top?: number;
};

export type News = {
  image: string;
  title: string;
  content: string;
  createdDate: Date;
};
