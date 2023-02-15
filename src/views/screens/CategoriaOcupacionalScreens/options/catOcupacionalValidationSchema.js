import * as yup from "yup";

export const initialValues = {
  nombre: "",
};

export const validationSchema = yup.object({
  nombre: yup
    .string()
    .trim()
    .required("El nombre es obligatorio")
    .min(4, "El nombre debe tener al menos 4 caracteres")
});
