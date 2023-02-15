import * as yup from "yup";

export const initialValues = {
  nombre: "",
  provincia:"",
};

export const validationSchema = yup.object({
  nombre: yup
    .string()
    .trim()
    .required("El nombre es obligatorio")
    .min(4, "El nombre de usuario debe tener al menos 4 caracteres")
    .matches(/^([^0-9]*)$/, "El primer nombre no debe contener números"),
  provincia: yup
      .number()
});
