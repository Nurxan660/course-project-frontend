import { Container, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from 'react-i18next';

interface FormInput {
  email: string;
  password: string;
}

const Registration = () => {
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    email: yup.string().required(t('emailRequired')).email(t('invalidEmail')),
    password: yup.string().required(t('passwordRequired'))
  })

  const {register, handleSubmit, formState: {errors}} = useForm<FormInput>({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = () => {
    console.log("hello")
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
        <h2 className="text-center mb-4">{t('registrationHeader')}</h2>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{t('emailLabel')}</Form.Label>
            <Form.Control
              type="email"
              placeholder={t('emailPlaceholder')}
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
            <Form.Label>{t('passwordLabel')}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t('passwordPlaceholder')}
              isInvalid={!!errors.password}
              {...register("password")}
            />
            {errors.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            {t('registerButton')}
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default Registration