type Property = {
  id: number;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  property_type_id: number;
  state_id: number;
  property_status_id: number;
  createdAt: string;
  updatedAt: string;

  property_type: {
    name: string;
  };
  state: {
    name: string;
  };
  property_status: {
    name: string;
  };
  property_images: PropertyImage[];
};

type PropertyImage = {
  id: number;
  image_path: string;
  property_id: number;
  createdAt: string;
};

export default Property;
