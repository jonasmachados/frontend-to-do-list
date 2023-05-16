import * as yup from "yup";

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Erro: Necessário preencher o nome do projeto!")
        .min(3, "Erro: O nome do projeto deve ter mais que 3 caracteres!")
        .max(50, "Erro: O nome do projeto deve ter menos que 50 caracteres!")
});

export const validateToDoList = async (newToDoList) => {
    try {
        await schema.validate(newToDoList, { abortEarly: false });
        return { isValid: true, errors: null };
    } catch (err) {
        const errors = {};
        err.inner.forEach((e) => {
            errors[e.path] = e.message;
        });

        return { isValid: false, errors };
    }
};