enum PropertyStatusType {
  Available = "1",
  Pending = "2",
  Rented = "3",
  Unavailable = "4",
}

type PropertyStatus = PropertyStatusType | undefined;

export { PropertyStatusType };
export type { PropertyStatus };
