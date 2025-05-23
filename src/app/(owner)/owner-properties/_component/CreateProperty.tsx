"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreatePropertySchema,
  CreatePropertyType,
} from "../utils/CreatePropertyInput";
import { Textarea } from "@/components/ui/textarea";
import FormErrorMessage from "@/app/_utilsComponents/FormErrorMessage";
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
import PropertyImagesPreview from "./PropertyImagesPreview";
import { v4 as uuidv4 } from "uuid";
import PropertyImageType from "../utils/PropertyImageType";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import revalidateRoute from "@/app/_utils/revalidateRoute";
import { PropertyTypesContext } from "@/app/_context/PropertyTypesContext";
import { StatesContext } from "@/app/_context/StatesContext";

function CreateProperty() {
  const [open, setOpen] = useState(false);

  const propertyTypes: PropertyTypesType[] | null =
    useContext(PropertyTypesContext);
  const states: StateType[] | null = useContext(StatesContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm<CreatePropertyType>({
    resolver: zodResolver(CreatePropertySchema),
  });

  const handleOpen = () => {
    setOpen(true);

    reset();
    setImages([]);
  };

  const closeForm = () => {
    setOpen(false);

    reset();
    setImages([]);
  };

  const submitForm = (data: CreatePropertyType) => {
    console.log(data);

    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: async (data: CreatePropertyType) => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (
          Array.isArray(value) &&
          value?.length > 0 &&
          value[0] instanceof File
        ) {
          value.forEach((property_image) => {
            formData.append("property_images", property_image);
          });
        } else if (
          typeof value === "string" ||
          typeof value === "number" ||
          value
        ) {
          formData.append(key, String(value));
        }
      });

      const res = await fetch(`${API_URL}/api/owner/properties`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      console.log(data);

      console.log(formData);

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.error);
      }

      return response;
    },
    onSuccess: (data) => {
      const { message } = data;
      toast("Success", {
        description: message || "Property added",
      });

      closeForm();

      revalidateRoute("/owner-properties");
    },
    onError: (error) => {
      toast("Error", {
        description: error.message || "Error",
      });

      console.log(error);
    },
  });

  const [images, setImages] = useState<PropertyImageType[]>([]);

  const removePropertyImage = (id: string) => {
    const index = images.findIndex(
      (propertyImage: PropertyImageType) => propertyImage.id === id
    );

    setImages((prev) =>
      prev.filter((propertyImage: PropertyImageType) => propertyImage.id !== id)
    );

    const property_images = getValues("property_images");

    property_images.splice(index, 1);

    setValue("property_images", property_images);
  };

  return (
    <>
      {/* Open button */}
      <div className="flex justify-end">
        <Button onClick={handleOpen}>
          <Plus />
        </Button>
      </div>

      {/* Form Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          className="overflow-y-auto max-h-[80vh]"
        >
          <DialogHeader>
            <DialogTitle className="text-center">Add New Property</DialogTitle>
          </DialogHeader>

          <DialogDescription>Enter information of property</DialogDescription>

          {/* Form */}
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="mt-3">
              {/* Input title */}
              <Label htmlFor="title">Title</Label>

              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input {...field} id="title" placeholder="Enter title" />
                )}
              />

              <FormErrorMessage errorMessage={errors.title?.message} />
            </div>

            <div className="mt-3">
              {/* Input description */}
              <Label htmlFor="description">Description</Label>

              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Optional"
                  />
                )}
              />

              <FormErrorMessage errorMessage={errors.description?.message} />
            </div>

            <div className="mt-3">
              {/* Input price */}
              <Label htmlFor="price">Price</Label>

              <Controller
                name="price"
                control={control}
                defaultValue={undefined}
                render={({ field: { value, onChange } }) => (
                  <Input
                    value={value || ""}
                    onChange={(e) =>
                      onChange(
                        e.target.value.trim() === ""
                          ? undefined
                          : parseFloat(e.target.value)
                      )
                    }
                    id="price"
                    type="number"
                    step="0.01"
                  />
                )}
              />

              <FormErrorMessage errorMessage={errors.price?.message} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              <div>
                {/* Input address */}
                <Label htmlFor="address">
                  Address{" "}
                  <span className="text-gray-500 text-xs">
                    (NOT exact address)
                  </span>
                </Label>

                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
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

              <div>
                {/* Input city */}
                <Label htmlFor="city">City</Label>

                <Controller
                  name="city"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input {...field} id="city" placeholder="Enter city" />
                  )}
                />

                <FormErrorMessage errorMessage={errors.city?.message} />
              </div>
            </div>

            <div className="mt-3">
              {/* Input state */}
              <Label htmlFor="state_id">State</Label>

              <Controller
                name="state_id"
                control={control}
                defaultValue={undefined}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              <div>
                {/* Input bedroom */}
                <Label htmlFor="bedroom">Bedroom</Label>

                <Controller
                  name="bedroom"
                  control={control}
                  defaultValue={undefined}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value || ""}
                      onChange={(e) =>
                        onChange(
                          isNaN(e.target.valueAsNumber)
                            ? undefined
                            : e.target.valueAsNumber
                        )
                      }
                      id="bedroom"
                      type="number"
                    />
                  )}
                />

                <FormErrorMessage errorMessage={errors.bedroom?.message} />
              </div>

              <div>
                {/* Input bathroom */}
                <Label htmlFor="bathroom">Bathroom</Label>

                <Controller
                  name="bathroom"
                  control={control}
                  defaultValue={undefined}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value || ""}
                      onChange={(e) =>
                        onChange(
                          isNaN(e.target.valueAsNumber)
                            ? undefined
                            : e.target.valueAsNumber
                        )
                      }
                      id="bathroom"
                      type="number"
                    />
                  )}
                />

                <FormErrorMessage errorMessage={errors.bathroom?.message} />
              </div>
            </div>

            <div className="mt-3">
              {/* Input property type */}
              <Label htmlFor="property_type_id">Type</Label>

              <Controller
                name="property_type_id"
                control={control}
                defaultValue={undefined}
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

            <div className="mt-3">
              <Label htmlFor="property_images">Images</Label>

              <Controller
                name="property_images"
                control={control}
                defaultValue={[]}
                render={({ field: { value, onChange } }) => (
                  <Input
                    className="hidden"
                    onChange={(e) => {
                      const newImages: File[] = Array.from(
                        e.target.files || []
                      );
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

              <FormErrorMessage
                errorMessage={errors.property_images?.message}
              />

              <PropertyImagesPreview
                propertyImages={images}
                removePropertyImage={removePropertyImage}
              />
            </div>

            <div className="flex justify-end mt-3">
              <Button type="submit">Add</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateProperty;
