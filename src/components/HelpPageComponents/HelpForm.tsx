import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import { createHelpFormSchema } from "../../service/validations/helpValidations";
import PriorityTypes from "../../enum/PriorityTypes";
import { createTicket } from "../../api/jira";
import { toast } from 'react-toastify';
import { getTokens } from "../../service/utils/authUtils";

const HelpForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const user = getTokens();

  const {register, handleSubmit, reset, formState: { errors }} = useForm({
    resolver: yupResolver(createHelpFormSchema(t))
  });

  const handleOnSubmit = async (data: any) => {
    setLoading(true);
    await handleTicketCreate(data);
    setLoading(false);
  }

  const handleTicketCreate = async (data: any) => {
    try {
      const res = await createTicket(data, window.location.href);
      reset();
      notifySuccess(res.data.message)
    } catch (e) { notifyError(t('createTicketError')) }
  }

  useEffect(() => {
    if(!user) {
      setErrorMessage(t('loginMessage'))
    }
  }, [t])

  return (
    <Container className="d-flex w-100 container-min-height">
      <Container className="border rounded px-4 py-3 m-auto shadow mw-400">
        <h2 className="text-center mb-4">{t("helpHeader")}</h2>
        <Form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{t("descriptionLabel")}</Form.Label>
            <Form.Control
              as="textarea"
              placeholder={t("descriptionPlaceholder")}
              isInvalid={!!errors.description}
              {...register("description")}
            />
            {errors.description && (
              <Form.Control.Feedback type="invalid">
                {errors.description.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{t("collectionLabel")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("collectionPlaceholder")}
              {...register("collection")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t("priorityLabel")}</Form.Label>
            <Form.Select
              isInvalid={!!errors.priority}
              {...register("priority")}
            >
              <option value="" hidden>
                {t("priorityPlaceholder")}
              </option>
              {Object.entries(PriorityTypes).map(([key, value]) => (
                <option key={key.toLowerCase()} value={value}>
                  {t(value.toLowerCase())}
                </option>
              ))}
            </Form.Select>
            {errors.priority && (
              <Form.Control.Feedback type="invalid">
                {errors.priority.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading || !user}
          >
            {loading ? <Spinner animation="border" /> : t("createButton")}
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default HelpForm;
