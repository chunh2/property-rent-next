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
};

export default Property;
