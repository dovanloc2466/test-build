import { FormInstance } from 'antd/lib/form';
import { ApiException } from 'libs/restful';

const errors = {
  'USERNAME_OR_PASSWORD_INVALID': 'Tài khoản hoặc mật khẩu không chính xác'
};

const getErrorResponseMessage = (errorCode: string) => {
  if (!errorCode) {
    return errorCode;
  }

  if (errorCode.startsWith('"') && errorCode.endsWith('"')) {
    errorCode = JSON.parse(errorCode);
  }

  return errors[errorCode] ?? errorCode;
};

export type IFormProps<P, V, R> = P & {
  readonly initialValues?: V;
  readonly form?: FormInstance;
  readonly loading?: boolean;
  readonly onSumbit: (formValues: V) => Promise<R>;
  readonly onSuccess: (response: R, request: V) => void;
}

export type IFormControlProps<P, V, R> = P & {
  readonly initialValues?: V;
  readonly onSuccess?: (response: R, request?: V) => void;
  readonly setSubmitting?: (isSumitting: boolean) => void;
  readonly form?: FormInstance;
}

export const createFormSubmit = <V = {}, R = {}>(sumbit: (value: V) => Promise<R>, onSuccess: (response: R, request: V) => void, setError) => async (values: V) => {
  try {
    const response = await sumbit(values);
    onSuccess(response, values);
  } catch (error) {
    if (ApiException.isApiException(error)) {
      const errorMessage = error.response
        ? getErrorResponseMessage(error.response)
        : error.message;
      
      setError(errorMessage);
      return;
    }

    throw error;
  }
};

export const formValidates = {
  required: { required: true, message: 'Vui lòng nhập thông tin' }
};