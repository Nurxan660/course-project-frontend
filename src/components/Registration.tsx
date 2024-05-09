import { Container, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormInput {
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string().required('Password is required')
})

const Registration = () => {
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
        <h2 className="text-center mb-4">Registration</h2>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
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
            Submit
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default Registration