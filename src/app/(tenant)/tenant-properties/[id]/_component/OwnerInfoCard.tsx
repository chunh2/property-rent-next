import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import PropertyType from "../../_utils/PropertyType";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import ContactButton from "./ContactButton";

type PropsType = {
  property: PropertyType;
};

function OwnerInfoCard({ property }: PropsType) {
  return (
    <>
      <Card>
        <CardHeader>
          <p className="text-center">Contact Owner</p>
        </CardHeader>

        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{property.user.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{property.user.email}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Phone</TableCell>
                <TableCell>{property.user.phone || "-"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter className="justify-end">
          <ContactButton userId={property.user_id} />
        </CardFooter>
      </Card>
    </>
  );
}

export default OwnerInfoCard;
