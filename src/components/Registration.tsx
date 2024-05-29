import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from 'react-i18next';
import { registerUser } from '../api/auth';
import { setTokens } from '../service/utils/tokenUtils';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface RegFormInput {
  email: string;
  password: string;
  fullName: string;
}

const Registration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object().shape({
    fullName: yup.string().required(t('fullNameRequired')),
    email: yup.string().required(t('emailRequired')).email(t('invalidEmail')),
    password: yup.string().required(t('passwordRequired')),
  })

  const {register, handleSubmit, formState: {errors}} = useForm<RegFormInput>({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async (formData: RegFormInput) => {
    try {
      setLoading(true);
      const res = await registerUser(formData);
      setTokens(res.data);
      navigate("/collections", { replace: true });
    } catch (e) { handleErrorResponse(e) }
    setLoading(false);
  };

  const handleErrorResponse = (e: any) => {
    const res = e.response?.data.error
    res ? setErrorMessage(res) : setErrorMessage(t('unexpectedError'))
  }

  return (
    <Container
      className="d-flex w-100"
      style={{ minHeight: "calc(100vh - 56px)" }}
    >
      <Container
        className="border rounded px-4 py-3 m-auto shadow"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">{t("registrationHeader")}</h2>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{t("fullNameLabel")}</Form.Label>
            <Form.Control
              type="email"
              placeholder={t("fullNamePlaceholder")}
              isInvalid={!!errors.email}
              {...register("fullName")}
            />
            {errors.fullName && (
              <Form.Control.Feedback type="invalid">
                {errors.fullName.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
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
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? <Spinner animation="border" /> : t("registerButton")}
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default Registration
export type {RegFormInput}