import * as yup from "yup";

const schema = yup.object().shape({
    title: yup
        .string()
        .required("Erro: Necessário preencher o titulo!")
        .min(3, "Erro: O titulo deve ter mais que 3 caracteres!")
        .max(50, "Erro: O titulo deve ter menos que 50 caracteres!"),
    content: yup
        .string()
        .required("Erro: Necessário preencher o conteúdo!")
        .min(3, "Erro: O conteúdo do projeto deve ter mais que 3 caracteres!")
        .max(500, "Erro: O conteúdo do projeto deve ter menos que 50 caracteres!")
});

export const validateTask = async (newTask) => {
    try {
        await schema.validate(newTask, { abortEarly: false });
        return { isValid: true, errors: null };
    } catch (err) {
        const errors = {};
        err.inner.forEach((e) => {
            errors[e.path] = e.message;
        });

        return { isValid: false, errors };
    }
};