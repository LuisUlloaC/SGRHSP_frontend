import * as yup from "yup";

export const initialValues = {
  nombre: "",
  categoriaOcupacional:"",
  grupoEscala:"",
  clasificacion:"",
};

export const validationSchema = yup.object({
  nombre: yup
    .string()
    .trim()
    .required("El nombre es obligatorio")
    .min(4, "El nombre debe tener al menos 4 caracteres"),
  categoriaOcupacional: yup
      .number(),
  grupoEscala: yup
      .number(),
  clasificacion: yup
      .number()
});
