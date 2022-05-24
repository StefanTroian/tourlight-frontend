export interface Post {
  username: string;
  userphoto: string;
  useruid: string;
  likes: [];
  locations: {}[];
  minimumDays?: number,
  maximumDays?: number
}
