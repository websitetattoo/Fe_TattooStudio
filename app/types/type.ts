import { UploadFile } from "antd";

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

export type Artist = {
  _id?: string;
  name: string;
  header: string;
  description: string;
  avatar: string;
  images: string[];
  link: string;
};

export type Booking = {
  name: string;
  phone: string;
  address: string;
  email: string;
  schedule: string;
  artist: Artist;
  images: string[];
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

export type filterArtistData = {
  page?: number;
  pageSize?: number;
  keyWord?: string;
  sort?: string;
  fields?: string;
};

export type filterBookingData = {
  page?: number;
  pageSize?: number;
  keyWord?: string;
  sort?: string;
  arrType?: PopulateBooking;
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
};

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

export type TypeFormPostArtist = {
  id?: string;
  name: string;
  header: string;
  description: string;
  avatar: UploadFile[] | File[] | null;
  images: UploadFile[] | File[] | null;
  link: string;
};

export type TypeFormPostBooking = {
  name: string;
  phone: string;
  address: string;
  description: string;
  email: string;
  schedule: string;
  artist: string;
  files: File[] | null;
};

export type TypeFormPostImage = {
  id: string;
  parentId: string;
  image: UploadFile | File | null;
};
// Định nghĩa các type from Post- End add

// Định nghĩa các type from View - Begin add
export type TypeFormViewBooking = {
  id: string;
  name?: string;
  phone?: string;
  address?: string;
  email?: string;
  schedule?: string;
  artist?: string;
  images?: string[];
};
// Định nghĩa các type from View - End add

// Định nghĩa các type Populate - Begin add
export type PopulateBooking = {
  artist: string;
};
// Định nghĩa các type Populate - End add
