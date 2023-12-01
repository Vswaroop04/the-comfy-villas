"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Pencil, Trash } from "lucide-react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import login from "@/lib/fetchers/auth/login";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { addListing } from "@/lib/fetchers/listing/addListing";
import { atom, useAtom } from "jotai";
import Compressor from "compressorjs";
import uploadPhotos from "@/lib/fetchers/listing/uploadPhotos";
import { editListing } from "@/lib/fetchers/listing/editListing";
import { TAddListingResponse } from "@/types/Listing";

const uploadedImagesAtom = atom<
  {
    file: File;
    dataURL: string;
    thumbnail: string;
    OG: string;
  }[]
>([]);

const editListingPopup = ({
  isOpen,
  setOpen,
  data,
  setFilteredListing,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  setFilteredListing: React.Dispatch<
    React.SetStateAction<TAddListingResponse[]>
  >;
}) => {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useAtom(uploadedImagesAtom);
  const [amenities, setAmenities] = useState(data.amenities);
  const [amenity, setAmenity] = useState("");

  // Function to handle adding a new amenity
  const addAmenity = (newAmenity: any) => {
    setAmenities([...amenities, newAmenity]);
  };

  // Function to handle removing an amenity
  const removeAmenity = (index: any) => {
    const newAmenities = amenities.filter((_: any, i: any) => i !== index);
    setAmenities(newAmenities);
  };
  const imageSchema = z.object({
    fullImageUrl: z.string(),
    thumbnailImageUrl: z.string(),
  });
  const [images, setImages] = React.useState<ImageListType>(() => {
    return uploadedImages.map((img) => {
      return {
        dataURL: img.thumbnail,
        file: img.file,
      };
    });
  });
  const maxNumber = 70;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };
  const formSchemaCreate = z.object({
    name: z.string(),
    beds: z.coerce.number().min(0),
    bathrooms: z.coerce.number().min(0),
    price: z.coerce.number().min(0),
    images: z.array(imageSchema),
    amenities: z.array(z.string()),
    location: z.string(),
  });

  const form = useForm<z.infer<typeof formSchemaCreate>>({
    resolver: zodResolver(formSchemaCreate),
    defaultValues: {
      name: data.name,
      beds: data.beds,
      bathrooms: data.bathrooms,
      price: data.price,
      images: data.images,
      amenities: data.amenities,
      location: data.location,
    },
  });

  const [isFetching, setIsFetching] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchemaCreate>) {
    setIsFetching(true);

    try {
      const uploadPromises = images.map((image) => {
        return new Promise((resolve, reject) => {
          new Compressor(image.file, {
            quality: 0.6,
            maxWidth: 800,
            maxHeight: 600,
            mimeType: "image/jpeg",
            success(compressedImage) {
              const formData = new FormData();
              formData.append("image", compressedImage);
              uploadPhotos(formData)
                .then((response: any) => response.json())
                .then((data) => {
                  resolve(data);
                })
                .catch((error) => reject(error));
            },
            error(err) {
              console.error("Compression error:", err);
              reject(err);
            },
          });
        });
      });

      const uploadedImagesResults = await Promise.all(uploadPromises);
      console.log("Uploaded images results:", uploadedImagesResults);

      const imagesPayload = uploadedImagesResults
        .map((result: any) => {
          return {
            fullImageUrl: result.fullImage,
            thumbnailImageUrl: result.thumbnail,
          };
        })
        .filter((img) => img.fullImageUrl && img.thumbnailImageUrl);
      console.log("Images payload:", imagesPayload);

      const resp = await editListing({
        id : data.id,
        name: values.name,
        beds: values.beds,
        bathrooms: values.bathrooms,
        price: values.price,
        amenities: amenities,
        images: imagesPayload,
        location: values.location,
      });

      console.log("Add listing response:", resp);
      setOpen(false);
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("An error occurred while submitting the listing.");
    }

    setIsFetching(false);
  }

  const { setUser } = useUser();

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent
        className="flex h-auto max-h-[90vh] min-h-fit w-4/5 max-w-xl flex-col rounded-3xl p-5 px-8 md:w-full bg-white overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="flex flex-col">
          <h1 className="flex justify-center text-3xl font-semibold tracking-tight text-[#580d83]">
            Edit Listing
          </h1>
          <Form {...form}>
            <>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-5 flex w-full flex-col gap-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl className="border-0 outline-none focus:border-0 focus:outline-0">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel className="text-grey-600">
                                Villa Name{" "}
                              </FormLabel>
                              <span className="flex items-center gap-2 border-2 p-2">
                                <FormControl className="border-0 outline-none focus:border-0 focus:outline-0">
                                  <Input
                                    type="name"
                                    placeholder="Villa Name"
                                    className="border-0 outline-none focus-visible:ring-0"
                                    {...field}
                                  />
                                </FormControl>
                              </span>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-grey-600">Price </FormLabel>
                      <span className="flex items-center gap-2 border-2 p-2">
                        <FormControl className="border-0 outline-none focus:border-0 focus:outline-0">
                          <Input
                            type="number"
                            placeholder="Villa Price"
                            className="border-0 outline-none focus-visible:ring-0"
                            {...field}
                          />
                        </FormControl>
                      </span>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-grey-600">Location </FormLabel>
                      <span className="flex items-center gap-2 border-2 p-2">
                        <FormControl className="border-0 outline-none focus:border-0 focus:outline-0">
                          <Input
                            type="name"
                            placeholder="Villa Location"
                            className="border-0 outline-none focus-visible:ring-0"
                            {...field}
                          />
                        </FormControl>
                      </span>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="beds"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-grey-600">Beds </FormLabel>
                      <span className="flex items-center gap-2 border-2 p-2">
                        <FormControl className="border-0 outline-none focus:border-0 focus:outline-0">
                          <Input
                            type="number"
                            placeholder="Villa Beds"
                            className="border-0 outline-none focus-visible:ring-0"
                            {...field}
                          />
                        </FormControl>
                      </span>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-grey-600">
                        Bathrooms{" "}
                      </FormLabel>
                      <span className="flex items-center gap-2 border-2 p-2">
                        <FormControl className="border-0 outline-none focus:border-0 focus:outline-0">
                          <Input
                            type="number"
                            placeholder="Villa Bathrooms"
                            className="border-0 outline-none focus-visible:ring-0"
                            {...field}
                          />
                        </FormControl>
                      </span>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormLabel className="text-grey-600">Upload Photos </FormLabel>

                <ImageUploading
                  multiple
                  value={images}
                  onChange={onChange}
                  maxNumber={70}
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper mt-2 flex flex-wrap items-center justify-center gap-1">
                      {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                      {imageList.map((image, index) => (
                        <div
                          key={`${Date.now() + Math.random()}${index}`}
                          className="image-item relative flex aspect-square h-32 w-32 items-center justify-center overflow-clip rounded-md border-2 border-gray-300"
                        >
                          <Image
                            src={image.dataURL!}
                            alt=""
                            width="100"
                            height="100"
                            className="h-full w-full object-cover"
                            unoptimized
                          />
                          <div className="image-item__btn-wrapper max-auto absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 px-2 pb-2">
                            <Button
                              onClick={() => onImageUpdate(index)}
                              className="aspect-square h-8 w-8 bg-white p-0 text-black"
                              variant={"secondary"}
                            >
                              <Pencil />
                            </Button>
                            <Button
                              onClick={() => onImageRemove(index)}
                              className="aspect-square h-8 w-8 bg-brand-error p-0 text-black"
                              variant={"secondary"}
                            >
                              <Trash />
                            </Button>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                        className="flex aspect-square h-32 w-32 items-center justify-center rounded-md border-2 border-gray-300"
                      >
                        Click or Drop here
                      </button>
                    </div>
                  )}
                </ImageUploading>
                <FormItem className="w-full">
                  <FormLabel className="text-grey-600">Amenities</FormLabel>
                  {amenities.map((field: any, index: any) => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <input
                        value={field}
                        onChange={(e) => {
                          const newAmenities = amenities.map(
                            (amenity: any, i: any) => {
                              if (i === index) {
                                return { ...amenity, value: e.target.value };
                              }
                              return amenity;
                            }
                          );
                          setAmenities(newAmenities);
                        }}
                        className="border-2 p-2 rounded-md focus:ring-blue-500"
                        placeholder="Enter amenity"
                      />
                      <button
                        type="button"
                        className="bg-red-500 text-white p-2 rounded-md"
                        onClick={() => removeAmenity(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <Input
                    type="text"
                    placeholder="Pool"
                    value={amenity}
                    onChange={(e) => setAmenity(e.target.value)}
                    className="border-0 outline-none focus-visible:ring-0"
                  />
                  <button
                    type="button"
                    className="bg-green-500 text-white p-2 mt-2 rounded-md"
                    onClick={() => {
                      if (amenity) {
                        addAmenity(amenity);
                        setAmenity("");
                      }
                    }}
                  >
                    Add Amenity
                  </button>
                </FormItem>

                {isFetching ? (
                  <div className="flex h-12 w-full items-center justify-center">
                    <Loader className="animate-spin" />
                  </div>
                ) : (
                  <div className="flex h-12 w-full items-center justify-center">
                    <Button
                      type="submit"
                      className="w-full bg-[#580d83] text-[#FFFFFF]"
                      variant={"outline"}
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </form>
            </>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default editListingPopup;
