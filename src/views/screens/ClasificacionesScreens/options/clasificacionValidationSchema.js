import * as yup from "yup";

export const initialValues = {
  nombre: "",
};

export const validationSchema = yup.object({
  nombre: yup
    .string()
    .trim()
    .required("El nombre es obligatorio")
    .min(2, "Debe tener al menos 2 caracteres")
});
