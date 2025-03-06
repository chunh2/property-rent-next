"use client";

import { Label } from "@/components/ui/label";
import Property from "../../utils/PropertyType";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import FormErrorMessage from "@/app/_utilsComponents/FormErrorMessage";
import { Button } from "@/components/ui/button";
import {
  EditPropertySchema,
  EditPropertyType,
} from "../_utils/EditPropertyInput";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StateType } from "@/app/_utils/getStates";
import { PropertyTypesType } from "@/app/_utils/getPropertyTypes";
import formatValueFromDb from "@/app/_utils/formatValueFromDb";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import revalidateRoute from "@/app/_utils/revalidateRoute";
import { PropertyStatusType } from "@/app/_utils/getPropertyStatuses";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import PropertyImageType from "../../utils/PropertyImageType";
import PropertyImagesPreview from "../../_component/PropertyImagesPreview";
import PropertyImagesPreviewFileFormat from "./PropertyImagesPreviewFileFormat";

type PropsType = {
  property: Property;
  states: StateType[];
  propertyTypes: PropertyTypesType[];
  propertyStatuses: PropertyStatusType[];
};

function EditForm({
  property,
  states,
  propertyTypes,
  propertyStatuses,
}: PropsType) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<EditPropertyType>({
    resolver: zodResolver(EditPropertySchema),
    defaultValues: {
      property_images_ids_DELETE: [],
    },
  });

  const handleUpdate = (data: EditPropertyType) => {
    console.log(data);

    const { id } = property;

    mutation.mutate({ data, id });
  };

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: EditPropertyType;
      id: number;
    }) => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const url = `${API_URL}/api/owner/properties/${id}`;

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (
          Array.isArray(value) &&
          value?.length > 0 &&
          value[0] instanceof File
        ) {
          value.forEach((property_image) => {
            if (property_image instanceof File) {
              formData.append("property_images", property_image);
            }
          });
        } else if (
          key === "property_images_ids_DELETE" &&
          Array.isArray(value)
        ) {
          value.forEach((id) => {
            formData.append("property_images_ids_DELETE[]", String(id));
          });
        } else if (
          typeof value === "string" ||
          typeof value === "number" ||
          value
        ) {
          formData.append(key, String(value));
        }
      });

      const res = await fetch(url, {
        method: "PATCH",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.error || response.message);
      }

      return response;
    },
    onSuccess: (response) => {
      const {
        message,
        data: { id },
      } = response;

      console.log(response);
      toast("Success", {
        description: message || "Operation performed successfully",
      });

      revalidateRoute("/owner-properties");

      router.push("/owner-properties");
    },
    onError: (error) => {
      console.error(error);
      toast("Error", {
        description: error.message || "Failed to perform the operation",
      });
    },
  });

  // new images added (for rendering)
  const [images, setImages] = useState<PropertyImageType[]>([]);

  // remove new images added
  const removePropertyImage = (id: string) => {
    const index = images.findIndex(
      (propertyImage: PropertyImageType) => propertyImage.id === id
    );

    setImages((prev) =>
      prev.filter((propertyImage: PropertyImageType) => propertyImage.id !== id)
    );

    const property_images = getValues("property_images");

    property_images?.splice(index, 1);

    setValue("property_images", property_images);
  };

  const propertyImagesIdsDELETE = watch("property_images_ids_DELETE");

  // add existing images to delete list
  const deletePropertyImage = (id: number) => {
    const property_images_ids_DELETE = getValues("property_images_ids_DELETE");
    setValue("property_images_ids_DELETE", [
      ...(property_images_ids_DELETE || []),
      id.toString(),
    ]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 md:gap-10 mt-3">
          <div className="col-span-1 sm:col-span-3 md:col-span-4 lg:col-span-10">
            {/* Input title */}
            <Label htmlFor="title">Title</Label>

            <Controller
              name="title"
              control={control}
              defaultValue={property.title}
              render={({ field }) => (
                <Input {...field} id="title" placeholder="Enter title" />
              )}
            />

            <FormErrorMessage errorMessage={errors.title?.message} />
          </div>

          <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2">
            {/* Input price */}
            <Label htmlFor="price">Price</Label>

            <Controller
              name="price"
              control={control}
              defaultValue={property.price}
              render={({ field }) => (
                <Input
                  {...field}
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="Monthly rent"
                />
              )}
            />

            <FormErrorMessage errorMessage={errors.price?.message} />
          </div>
        </div>

        <div className="mt-3">
          {/* Input description */}
          <Label htmlFor="description">Description</Label>

          <Controller
            name="description"
            control={control}
            defaultValue={property.description}
            render={({ field }) => (
              <Textarea
                {...field}
                id="description"
                placeholder="Enter description (optional)"
              />
            )}
          />

          <FormErrorMessage errorMessage={errors.description?.message} />
        </div>

        {/* Input Group LOCATION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-11 gap-2 md:gap-10 mt-3">
          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-4">
            {/* Input address */}
            <Label htmlFor="address">Address</Label>

            <Controller
              name="address"
              control={control}
              defaultValue={property.address}
              render={({ field }) => (
                <Input
                  {...field}
                  id="address"
                  placeholder="Enter a rough area"
                />
              )}
            />

            <FormErrorMessage errorMessage={errors.address?.message} />
          </div>

          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-4">
            {/* Input city */}
            <Label htmlFor="city">City</Label>

            <Controller
              name="city"
              control={control}
              defaultValue={property.city}
              render={({ field }) => (
                <Input {...field} id="city" placeholder="Enter city" />
              )}
            />

            <FormErrorMessage errorMessage={errors.city?.message} />
          </div>

          <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-3">
            {/* Input state */}
            <Label htmlFor="state_id">State</Label>

            <Controller
              name="state_id"
              control={control}
              defaultValue={property.state_id}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value?.toString()}
                  onValueChange={(selectedValue) =>
                    onChange(parseInt(selectedValue))
                  }
                >
                  <SelectTrigger id="state_id">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>

                  <SelectContent>
                    {states?.map((state: StateType) => (
                      <SelectItem key={state.id} value={state.id.toString()}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <FormErrorMessage errorMessage={errors.state_id?.message} />
          </div>
        </div>

        {/* Input Group PROPERTY INFO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-2 md:gap-10 mt-3">
          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-3">
            {/* Input bedroom */}
            <Label htmlFor="bedroom">Bedroom</Label>

            <Controller
              name="bedroom"
              control={control}
              defaultValue={property.bedroom}
              render={({ field }) => (
                <Input {...field} id="bedroom" type="number" />
              )}
            />

            <FormErrorMessage errorMessage={errors.bedroom?.message} />
          </div>

          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-3">
            {/* Input bathroom */}
            <Label htmlFor="bathroom">Bathroom</Label>

            <Controller
              name="bathroom"
              control={control}
              defaultValue={property.bathroom}
              render={({ field }) => (
                <Input {...field} id="bathroom" type="number" />
              )}
            />

            <FormErrorMessage errorMessage={errors.bathroom?.message} />
          </div>

          <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-6">
            {/* Input property type */}
            <Label htmlFor="property_type_id">Type</Label>

            <Controller
              name="property_type_id"
              control={control}
              defaultValue={property.property_type_id}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value?.toString()}
                  onValueChange={(selectedValue) =>
                    onChange(parseInt(selectedValue))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>

                  <SelectContent>
                    {propertyTypes?.map((propertyType) => (
                      <SelectItem
                        key={propertyType.id}
                        value={propertyType.id.toString()}
                      >
                        {formatValueFromDb(propertyType.name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <FormErrorMessage
              errorMessage={errors?.property_type_id?.message}
            />
          </div>
        </div>

        <div>
          {/* Input property status */}
          <Label htmlFor="property_status_id">Status</Label>

          <Controller
            name="property_status_id"
            control={control}
            defaultValue={property.property_status_id}
            render={({ field: { value, onChange } }) => (
              <Select
                value={value.toString()}
                onValueChange={(selectedValue) =>
                  onChange(parseInt(selectedValue))
                }
              >
                <SelectTrigger id="property_status_id">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  {propertyStatuses.map((propertyStatus) => (
                    <SelectItem
                      key={propertyStatus.id}
                      value={propertyStatus.id.toString()}
                    >
                      {formatValueFromDb(propertyStatus.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="mt-3">
          <Label>Existing Images</Label>

          <PropertyImagesPreviewFileFormat
            propertyImages={property.property_images}
            deletePropertyImage={deletePropertyImage}
            propertyImagesIdsDELETE={propertyImagesIdsDELETE || []}
          />
        </div>

        <div className="mt-3">
          {/* Input property_images */}
          <Label htmlFor="property_images">New Images</Label>

          <Controller
            name="property_images"
            control={control}
            defaultValue={[]}
            render={({ field: { value, onChange } }) => (
              <Input
                className="hidden"
                onChange={(e) => {
                  const newImages: File[] = Array.from(e.target.files || []);
                  const existingImages = value || [];
                  onChange([...existingImages, ...newImages]);

                  const images = newImages.map((image) => ({
                    id: uuidv4(),
                    property_image: image,
                  }));

                  setImages((prev: PropertyImageType[]) => [
                    ...prev,
                    ...images,
                  ]);
                }}
                id="property_images"
                type="file"
                multiple
              />
            )}
          />

          <FormErrorMessage errorMessage={errors.property_images?.message} />

          <PropertyImagesPreview
            propertyImages={images}
            removePropertyImage={removePropertyImage}
          />
        </div>

        <div className="flex justify-end my-2">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </>
  );
}

export default EditForm;
