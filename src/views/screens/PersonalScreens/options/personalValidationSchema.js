import * as yup from "yup";

export const initialValues = {
  nombre: "",
  apellidos:"",
  sexo:"",
  ci:"",
  direccionParticular:"",
  fechaAlta:"",
  fechaBaja:"",
  fuenteProcedencia:"",
  motivoBaja:"",
  plaza:"",
};

export const validationSchema = yup.object({
  nombre: yup
    .string()
    .trim()
    .required("El nombre es obligatorio")
    .min(4, "El nombre debe tener al menos 4 caracteres"),
  apellidos: yup
      .string(),
  sexo: yup
      .string(),
  ci: yup
      .string(),
  direccionParticular: yup
      .string(),
  fechaAlta: yup
      .string(),
  fechaBaja: yup
      .string(),
  fuenteProcedencia: yup
      .number(),
  motivoBaja: yup
      .number(),
  plaza: yup
      .number()
});
