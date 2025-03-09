type PropertyType = {
  id: number;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  property_type_id: number;
  user_id: number;
  state_id: number;
  property_status_id: number;
  createdAt: string;
  updatedAt: string;

  property_type: PropertyTypeType;

  state: PropertyStateType;

  property_status: PropertyStatusType;

  property_images: PropertyImageType[];

  user: UserType;
};

type PropertyTypeType = {
  id: number;
  name: string;
};

type PropertyStateType = {
  id: number;
  name: string;
};

type PropertyStatusType = {
  id: number;
  name: string;
};

type PropertyImageType = {
  id: number;
  image_path: string;
};

type UserType = {
  user_id: number;
  name: string;
  email: string;
  phone: string;
};

export default PropertyType;
