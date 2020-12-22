import { Button, Form, Input } from 'antd';
import { LoginViewModel } from 'libs/restful';
import * as React from 'react';
import Keyboard from 'react-simple-keyboard';
import KeyboardReact from 'react-simple-keyboard';
import styled from 'styled-components';

import { AlertError } from '@/_shared/components/common';
import { formValidates } from '@/_shared/utils';

const _LoginForm = styled.div`
  .react-simple-keyboard{
    .btnKeyboard{
      font-size:20px;
      height:60px;
      font-weight:600;
      font-size: 30px;
    }
    position: fixed;
    left: 0;
    bottom: 0;
  }
`;

export interface ILoginFormValue extends LoginViewModel {
}

interface ILoginFormProps {
  readonly loading: boolean;
  readonly error: boolean;
  readonly onSumbit: (e) => void;
}

export const LoginForm = (props: React.PropsWithChildren<ILoginFormProps>) => {
  const { onSumbit, loading, error } = props;
  const [nameFieldFocus, setNameFieldFocus] = React.useState<string>('username');

  const commonOptions = {
    layout: {
      default: [
        '1 2 3 4 5 6 7 8 9 0 - + = {bksp}',
        'q w e r t y u i o p |',
        'a s d f g h j k l : {enter}',
        'z x c v b n m , . ? {shift}',
        '@ {space}'
      ],
      shift: [
        '1 2 3 4 5 6 7 8 9 0 - + = {bksp}',
        'Q W E R T Y U I O P |',
        'A S D F G H J K L : {enter}',
        'Z X C V B N M , . ? {shift}',
        '@ {space}'
      ]
    },
    buttonTheme: [{
      class: 'btnKeyboard',
      buttons: '1 2 3 4 5 6 7 8 9 0 - + = {bksp} q w e r t y u i o p {clear} a s d f g h j k l : {enter} z x c v b n m , . ? {shift} .com @ {space} |'
    },
    {
      class: 'btnKeyboard',
      buttons: '1 2 3 4 5 6 7 8 9 0 - + = {bksp} Q W E R T Y U I O P {clear} A S D F G H J K L : {enter} Z X C V B N M , . ? {shift} .COM @ {space} |'
    }
    ]
    ,
    theme: 'hg-theme-default hg-theme-numeric',
    mergeDisplay: true,
    display: {
      '{bksp}': 'Xóa',
      '{enter}': 'Enter',
      '{space}': 'Cách',
      '{shift}': 'Hoa/thường'
    },
    syncInstanceInputs: true
  };

  const [layout, setLayout] = React.useState<string>('default');

  const onKeyPress = button => {
    if (button === '{shift}' || button === '{lock}') {
      const newLayoutName = layout === 'default' ? 'shift' : 'default';
      setLayout(newLayoutName);
    }
  };

  const [form] = Form.useForm();

  const keyboard = React.useRef<KeyboardReact>();

  return (
    <_LoginForm>
      <Form
        form={form}
        onFinish={onSumbit}
      >
        {error && (
          <AlertError message={'Vui lòng kiểm tra lại'} />
        )}
        <Form.Item
          name={nameof.full<ILoginFormValue>(o => o.username)}
          rules={[formValidates.required]}
        >
          <Input
            onChange={
              () => {
                keyboard.current?.setInput(form.getFieldValue('username'));
              }
            }
            onFocus={
              () => {
                setNameFieldFocus('username');
                keyboard.current?.setInput(form.getFieldValue('username'));
              }
            }
          />
        </Form.Item>
        <Form.Item
          name={nameof.full<ILoginFormValue>(o => o.password)}
          rules={[formValidates.required]}
        >
          <Input.Password
            onChange={
              () => {
                keyboard.current?.setInput(form.getFieldValue('password'));
              }
            }
            onFocus={
              () => {
                setNameFieldFocus('password');
                keyboard.current?.setInput(form.getFieldValue('password'));
              }
            }
          />
        </Form.Item>
        <Form.Item noStyle={true}>
          <Button
            className="login-form-submit-btn"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Keyboard
        {...commonOptions}
        layoutName={layout}
        onKeyPress={onKeyPress}
        onChange={(e) => {
          if (nameFieldFocus == 'username') {
            form.setFieldsValue({
              username: e
            });
          }
          if (nameFieldFocus == 'password') {
            form.setFieldsValue({
              password: e
            });
          }
        }}
        keyboardRef={r => (keyboard.current = r)}
        onRender={() => {
          return;
        }}
      />
    </_LoginForm>
  );
};
