export interface IRestaurant {
  name: string;
  openDaysAndHours?: IRestaurantDetails[];
}

export interface IRestaurantDetails {
  openDay: string;
  openTime: string;
  closeTime: string;
}

export interface IRestaurantResponseBody {
  list: IRestaurant[];
  page: number;
  pageSize: number;
  total: number;
}
