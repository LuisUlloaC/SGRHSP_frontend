import * as yup from "yup";

export const initialValues = {
  nombre: "",
  cantidad:"",
  necesarios:"",
  cubiertas:"",
  mision:"",
  unidadOrganizativa:"",
  cargo:"",
  nivelPreparacion:"",
};

export const validationSchema = yup.object({
  nombre: yup
    .string()
    .trim()
    .required("El nombre es obligatorio")
    .min(4, "El nombre debe tener al menos 4 caracteres"),
  cantidad: yup
      .number(),
  necesarios: yup
      .number(),
  cubiertas: yup
      .number(),
  mision: yup
      .number(),
  unidadOrganizativa: yup
      .number(),
  cargo: yup
      .number(),
  nivelPreparacion: yup
      .number()
});
