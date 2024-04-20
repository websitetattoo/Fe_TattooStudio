// Định nghĩa các type đối tượng - Begin add
export type Data = {
  total?: number;
  data?: [];
};

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
};

export type Faq = {
  title: string;
  content: string;
};

export type News = {
  image: string;
  title: string;
  content: string;
  createdDate: Date;
};

export type User = {
  _id?: string;
  tel: string;
  email: string;
  instagram: string;
  facebook: string;
};
// Định nghĩa các type đối tượng - End add

// Định nghĩa các type filter - Begin add
export type filterData = {
  page?: number;
  pageSize?: number;
  keyWord?: string;
  sort?: string;
};

export type filterTattooCareData = {
  page?: number;
  pageSize?: number;
  keyWord?: string;
  sort?: string;
};

export type filterFaqData = {
  page?: number;
  pageSize?: number;
  keyWord?: string;
  sort?: string;
};
// Định nghĩa các type filter - End add

// Định nghĩa các type from Post- Begin add
export type TypeFormPostPolicy = {
  id: string;
  title?: string;
  subtitle?: string;
  content?: string;
  isSubTitle?: boolean;
  isImportant?: boolean;
};


export type TypeFormPostNews = {
  id: string;
  files: File | null;
  title: string;
  content: string;
  createdDate: Date;
};

export type TypeFormUpdateUser = {
  id: string;
  tel: string;
  email: string;
  instagram: string;
  facebook: string;

export type TypeFormPostTattooCare = {
  id: string;
  title?: string;
  content?: string;
};

export type TypeFormPostFaq = {
  id: string;
  title?: string;
  content?: string;

};
// Định nghĩa các type from Post- End add
