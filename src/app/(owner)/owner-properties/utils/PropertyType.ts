type Property = {
  id: number;
  title: string;
  description: string;
  price: number;
  city: string;
  bedroom: number;
  bathroom: number;
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
