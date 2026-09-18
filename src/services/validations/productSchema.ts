import * as yup from "yup";

export const productFormSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  description: yup.string().trim().required("Description is required"),
  category: yup.string().trim().required("Category is required"),
  price: yup.string().trim().required("Price is required"),
  image: yup
    .mixed<FileList>()
    .test("required", "Image is required", (value: any) => {
      if (!value) return false;
      // Checks if it's a FileList with at least 1 file
      if (typeof FileList !== "undefined" && value instanceof FileList) {
        return value.length > 0;
      }
      // Checks if it's an individual File
      if (typeof File !== "undefined" && value instanceof File) {
        return value.size > 0;
      }
      return false;
    })
    .required("Image is required"),
});
