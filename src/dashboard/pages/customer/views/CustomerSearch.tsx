
import 'react-simple-keyboard/build/css/index.css';

import { Alert } from 'antd';
import axios from 'axios';
import { getStoredAccessToken } from 'libs/restful';
import React, { FunctionComponent, MutableRefObject } from 'react';
import { useHistory } from 'react-router';
import Keyboard from 'react-simple-keyboard';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { currentCustomerState, currentUserState, ICustomer } from '@/_shared';
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';

const _CustomerSearch = styled.div`
  .container{
    background: white;
    .Keyboard{
      height: 50vh;
      width: 98%;
      margin:auto;
      position: fixed;
      background:#f0f2f5;
      left: 0;
      bottom: 0;
      width: 100%;
      text-align: center; 
      padding-right: 10px;
      padding-left:10px;
      padding-bottom: 20px;
    }
    .simple-keyboard {
      width: 100%;
      margin: auto;
      z-index:10000000;
      .btnKeyboard{
        font-size: 20px;
        height: 9.3vh;
        font-weight: 600;
        font-size: 4vh;
      }
    }
  }
  .cover  {
    width: 65vw;
    margin: auto;
    background: white;
    text-align: center;
    align-items: center;
    padding-top: 5vh;
  }

  .flex-btn-create,.flex-btn-ignore{
    margin: auto;
    margin-bottom: 2vh;
    display: flex;
    z-index: 10;
    position: relative;
    width: 30%;
    border-radius: 25px;
    margin-top: 2vh;
    .btn-Create, .btn-ignore{
      height: 7vh;
      flex-basis: 230px;
      border: 0;
      font-size: 1.5rem;
      border-radius: 0;
      font-weight:600;
      outline: 0;
      -webkit-appearance: none;
      background: #00bedf;
      color: #ffffff;
      cursor: pointer;
    }
  }
  .flex-form{
    width: 100%;
    position: relative;
    margin-bottom: 2vh;
    .btn-comeBack ,.btn-name{
      position: absolute;
      z-index: 10;
      left: 0;
      top: 0;
      background: #00bedf;
      color: #ffffff;
      height: 10vh;
    }
    .btn-phone ,.btn-name-right{
      height: 10vh;
      right: 0;
      top: 0;
      position: absolute;
      background: #00bedf;
      color: #ffffff;
    }   
    input {
      width: 100%;
      height: 10vh;
      border-radius: 13px;
      padding: 10px 80px;
      border: 1px solid rgb(239, 239, 239);
      font-weight : 700;
      font-size: 5vh;
    }
    input::placeholder {
      color:rgb(202 184 184);
      opacity: 0.8;
      text-transform: uppercase;
    }
  }

  .flex-form > * {
    border: 0;
    line-height: 50px;
    font-size: 1rem;
    border-radius: 0;
    outline: 0;
    -webkit-appearance: none;
    cursor: pointer;
  }
`;

interface ICustomerSearchProps {

}
interface IKeyboard {
  layoutName?: string;
  phone: string;
  name: string;
  inputName: string;
}
interface IProps {
  inputName?: string;
  commonOptions: any;
  onKeyPress: (input: string, keyboardRef: MutableRefObject<Keyboard | undefined>) => void;
  onChange?: (input: string) => void;
  onChangeAll?: (input: IKeyboard) => void;
  keyboardRef: MutableRefObject<Keyboard | undefined>;
}

export const CustomerSearch = (props: React.PropsWithChildren<ICustomerSearchProps>) => {
  const { } = props;

  const [alertMessage, setAlertMessage] = React.useState({
    isError: false,
    errorMess: ''
  });

  const [stateKeyboard, setStateKeyboard] = React.useState<IKeyboard>();
  const { ref, isVisible, setIsVisible } = useVisible(true);
  const [, setcurrentCustomer] = useRecoilState(currentCustomerState);
  const [currentUser] = useRecoilState(currentUserState);

  const existingToken = getStoredAccessToken();
  const history = useHistory();
  const keyboard = React.useRef();

  React.useEffect(() => {
    setStateKeyboard({
      ...stateKeyboard,
      layoutName: 'default',
      phone: '',
      name: '',
      inputName: 'phone'
    } as IKeyboard);

    document.removeEventListener('click', onClick);
  }, []);

  const commonOptions = {
    layout: {
      shift: [
        '1 2 3 4 5 6 7 8 9 0 - + = {bksp}',
        'q w e r t y u i o p {clear}',
        'a s d f g h j k l : {enter}',
        'z x c v b n m , . ? {shift}',
        '@ {space}'
      ],
      default: [
        '1 2 3 4 5 6 7 8 9 0 - + = {bksp}',
        'Q W E R T Y U I O P {clear}',
        'A S D F G H J K L : {enter}',
        'Z X C V B N M , . ? {shift}',
        '@ {space}'
      ]
    },
    buttonTheme: [{
      class: 'btnKeyboard',
      buttons: '1 2 3 4 5 6 7 8 9 0 - + = {bksp} q w e r t y u i o p {clear} a s d f g h j k l : {enter} z x c v b n m , . ? {shift} .com @ {space} '
    },
    {
      class: 'btnKeyboard',
      buttons: '1 2 3 4 5 6 7 8 9 0 - + = {bksp} Q W E R T Y U I O P {clear} A S D F G H J K L : {enter} Z X C V B N M , . ? {shift} .COM @ {space} '
    }
    ]
    ,
    layoutName: stateKeyboard?.layoutName,
    theme: 'hg-theme-default hg-theme-numeric',
    mergeDisplay: true,
    display: {
      '{bksp}': 'Xóa',
      '{enter}': 'Tìm',
      '{space}': 'Cách',
      '{clear}': 'Xóa tất cả',
      '{shift}': 'Hoa/thường'
    },
    syncInstanceInputs: true
  };

  const onClick = () => {
    setIsVisible(true);
  };
  const getCustomer = async (phone) => {
    if (phone) {
      await axios.get(
        `${API_URL}/customers?mobile=` + phone,
        {
          headers: {
            authorization: `Bearer ${existingToken}`
          }
        }
      ).then(e => {
        if (e.data.data.length > 0) {
          setcurrentCustomer({
            id: e.data.data[0].id,
            mobile: e.data.data[0].mobile,
            code: e.data.data[0].code,
            name: e.data.data[0].name,
            refByCustomerId: e.data.data[0].refByCustomerId,
            salonBranchId: e.data.data[0].salonBranchId,
            salonId: e.data.data[0].salonId,
            status: e.data.data[0].status
          } as ICustomer);
          history.push('/casher');
        } else {
          setAlertMessage({
            isError: true,
            errorMess: 'Không tìm thấy khách hàng!'
          });
        }
      });
    }
  };

  const onClickSearch = () => {
    if (stateKeyboard?.phone) {
      if (stateKeyboard?.phone.length > 9) {
        getCustomer(stateKeyboard.phone);
      }
      else {
        setAlertMessage({
          isError: true,
          errorMess: 'Vui lòng nhập đầy đủ số điện thoại'
        });
        return;
      }

    }
    else {
      setAlertMessage({
        isError: true,
        errorMess: 'Vui lòng nhập đầy đủ thông tin'
      });
    }
    setIsVisible(true);
  };

  const onKeyPressKeyBoard = (button, keyboardRef: MutableRefObject<Keyboard | undefined>) => {
    if (button === '{enter}') {

      if (stateKeyboard?.phone) {
        if (stateKeyboard?.phone.length > 9) {
          getCustomer(stateKeyboard.phone);
        }
        else {
          setAlertMessage({
            isError: true,
            errorMess: 'Vui lòng nhập đầy đủ số điện thoại'
          });
        }
      } else {
        setAlertMessage({
          isError: true,
          errorMess: 'Vui lòng nhập đầy đủ thông tin'
        });
      }
      return;
    }

    if (button === '{clear}') {
      keyboardRef.current?.clearInput(stateKeyboard?.inputName);
      if (stateKeyboard?.inputName === 'phone') {
        setStateKeyboard({ ...stateKeyboard, phone: '' } as IKeyboard);
      }
      else {
        setStateKeyboard({ ...stateKeyboard, name: '' } as IKeyboard);
      }
      return;
    }
    if (button === '{shift}') {
      const layoutName = stateKeyboard?.layoutName === 'default' ? 'shift' : 'default';
      setStateKeyboard({ ...stateKeyboard, layoutName: layoutName } as IKeyboard);
      return;
    }
  };

  const comeBack = () => {
    history.push('/casher');
  };

  const setActiveInput = (event) => {
    setStateKeyboard({
      ...stateKeyboard,
      inputName: event.target.id
    } as IKeyboard);
  };

  const onChangeAll = (input: IKeyboard) => {
    setStateKeyboard({
      ...stateKeyboard,
      phone: input.phone,
      name: input.name
    } as IKeyboard);
  };

  const onCreate = async () => {

    if (stateKeyboard?.phone && stateKeyboard.name && stateKeyboard?.phone.length > 9) {
      const data = {
        name: stateKeyboard.name,
        mobile: stateKeyboard?.phone,
        salonBranchId: currentUser?.salonBranchCurrentId,
        salonId: currentUser?.salonId
      };
      await axios.post(`${API_URL}/Customers`, data, {
        headers: {
          authorization: `Bearer ${existingToken}`
        }
      }).then(e => {
        setcurrentCustomer({
          id: e.data.data.id,
          mobile: e.data.data.mobile,
          code: e.data.data.code,
          name: e.data.data.name,
          refByCustomerId: e.data.data.refByCustomerId,
          salonBranchId: e.data.data.salonBranchId,
          salonId: e.data.data.salonId,
          status: e.data.data.status
        } as ICustomer);
        history.push('/casher');
      }).catch(e => {
        setAlertMessage({
          isError: true,
          errorMess: 'Khách hàng đã tồn tại'
        });
      });
    }
    else {
      setAlertMessage({
        isError: true,
        errorMess: 'Vui lòng nhập đầy đủ thông tin'
      });
    }
  };

  return (
    <_CustomerSearch>
      <div className="container">
        <div className="cover">
          <div className="flex-form">
            <button
              className='btn-comeBack'
              onClick={comeBack}
              style={{ borderRadius: '10px 0px 0px 10px' }}
              type='button'
            >
              <ArrowLeftOutlined style={{ padding: 15, fontSize: 30 }} />
            </button>
            <input
              autoComplete='off'
              type="search"
              onFocus={setActiveInput}
              id="phone"
              name='phone'
              value={stateKeyboard ? stateKeyboard?.phone : ''}
              onClick={onClick}
              onChange={() => { return; }}
              placeholder="Nhập số điện thoại"
            />
            <button
              className='btn-phone'
              style={{ borderRadius: '0px 10px 10px 0px' }}
              type="button"
              onClick={onClickSearch}
            >
              <SearchOutlined style={{ padding: 15, fontSize: 30 }} />
            </button>
          </div>
          <div className="flex-form">
            <button
              className='btn-name'
              style={{ borderRadius: '10px 0px 0px 10px' }}
              type='button'
            >
              <span style={{ padding: 30, fontSize: 30 }} />
            </button>
            <input
              autoComplete='off'
              type="search"
              onFocus={setActiveInput}
              id="name"
              name='name'
              value={stateKeyboard ? stateKeyboard?.name : ''}
              onClick={onClick}
              onChange={() => { return; }}
              placeholder="Nhập tên khách hàng"
            />
            <button
              className='btn-name-right'
              style={{ borderRadius: '0px 10px 10px 0px' }}
              type="button"
            >
              <span style={{ padding: 30, fontSize: 30 }} />
            </button>
          </div>
          <div style={{ width: '100%', display: 'flex' }}>

            <div className="flex-btn-create">
              <button
                onClick={onCreate}
                className='btn-Create'
                style={{ borderRadius: '10px 10px 10px 10px' }}
                type='button'
              >
                TẠO
              </button>
            </div>
            <div className="flex-btn-ignore">
              <button
                className='btn-ignore'
                onClick={comeBack}
                style={{ borderRadius: '10px 10px 10px 10px' }}
                type='button'
              >
                BỎ QUA
                </button>
            </div>
          </div>
          {
            alertMessage.isError && (
              <Alert style={{ fontSize: 20, marginTop: 10 }}
                message={alertMessage.errorMess} type="error" />
            )
          }
        </div>
        <section
          className='Keyboard'
          ref={ref}
          style={{ display: isVisible ? 'block' : 'none' }}
        >
          <KeyboardWrapper
            inputName={stateKeyboard?.inputName}
            commonOptions={commonOptions}
            keyboardRef={keyboard}
            onKeyPress={onKeyPressKeyBoard}
            onChangeAll={onChangeAll}
          />
        </section>
      </div>
    </_CustomerSearch >
  );
};

const useVisible = (initialIsVisible) => {

  const [isVisible, setIsVisible] = React.useState(initialIsVisible);
  const ref = React.useRef<any>();
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current?.contains(event.target)) {
      return setIsVisible(false);
    }
    return setIsVisible(true);
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [initialIsVisible]);

  return { ref, isVisible, setIsVisible };
};

export const KeyboardWrapper: FunctionComponent<IProps> = ({ inputName, commonOptions, onKeyPress, onChange, onChangeAll, keyboardRef }: IProps) => {

  return (
    <Keyboard
      inputName={inputName}
      keyboardRef={r => (keyboardRef.current = r)}
      {...commonOptions}
      onChange={onChange}
      onKeyPress={e => onKeyPress(e, keyboardRef)}
      onRender={() => { return; }}
      onChangeAll={onChangeAll}
    />
  );
};