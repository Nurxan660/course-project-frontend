import { Form, FormControl } from "react-bootstrap";
import { CustomField } from "../../types/CustomField";
import { UseFormRegister, FieldErrors } from "react-hook-form";

const renderField = (field: CustomField, registerProps: UseFormRegister<any>, errors: FieldErrors<any>) => (
    <>
    <Form.Label>{field.name}</Form.Label>
    <Form.Control
        {...registerProps(field.name, { required: field.isRequired })}
        type={field.type}
        placeholder={`Enter ${field.name}`}
        isInvalid={!!errors[field.name]}
    />
    </>
);

const renderTextAreaField = (field: CustomField, registerProps: UseFormRegister<any>, errors: FieldErrors<any>) => (
    <>
    <Form.Label>{field.name}</Form.Label>
    <FormControl
      as="textarea"
      {...registerProps(field.name, { required: field.isRequired })}
      placeholder={`Enter ${field.name}`}
    />
    </>
);

const renderCheckBoxField = (field: CustomField, registerProps: UseFormRegister<any>, errors: FieldErrors<any>) => (
    <Form.Check label={field.name} {...registerProps(field.name)}/>
);

export {renderField, renderTextAreaField, renderCheckBoxField}