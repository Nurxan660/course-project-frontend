import { Container, Form, Button, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../api/auth";
import { setTokens } from "../service/token-service";
import { useState } from "react";

interface FormInput {
  email: string;
  password: string;
}

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = yup.object().shape({
    email: yup.string().required(t("emailRequired")).email(t("invalidEmail")),
    password: yup.string().required(t("passwordRequired")),
  });

  const { register, handleSubmit, formState: { errors }} = useForm<FormInput>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (formData: FormInput) => {
    try {
        const res = await login(formData);
        setTokens(res.data)
        navigate("/collections", { replace: true });
    } catch (e: any) { handleErrorResponse(e) }
  };

  const handleErrorResponse = (e: any) => {
    const res = e.response?.data.message
    res ? setErrorMessage(res) : setErrorMessage(t('unexpectedError'))
  }

  return (
    <Container className="d-flex w-100 container-min-height">
      <Container
        className="border rounded px-4 py-3 m-auto shadow mw-400">
        <h2 className="text-center mb-4">{t("loginHeader")}</h2>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{t("emailLabel")}</Form.Label>
            <Form.Control
              type="email"
              placeholder={t("emailPlaceholder")}
              isInvalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{t("passwordLabel")}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t("passwordPlaceholder")}
              isInvalid={!!errors.password}
              {...register("password")}
            />
            {errors.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          {errorMessage && (
            <Alert variant="danger">{errorMessage}</Alert>
          )}
          <Button variant="primary" type="submit" className="w-100">
            {t("loginButton")}
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default Login;
