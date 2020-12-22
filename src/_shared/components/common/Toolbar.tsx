import React, { ReactNode } from 'react';
import styled from 'styled-components';

const _Toolbar = styled.div`
  display: flex;
  margin-bottom: 24px;
  &>.toolbar-title {
    flex: 1 1;
    display : flex;
    &> span {
      color: rgba(0,0,0,.85);
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      opacity: .85;
      line-height: 33px;
  }
    &> div {
        flex :1 1;
    }
  } 
`;

interface IToolbarProps {
  readonly title: string | React.ReactNode;
  formAction?: React.ReactNode;
}

export const Toolbar = (props: React.PropsWithChildren<IToolbarProps>) => {
  const { title, children, formAction } = props;

  React.useEffect(() => {
    //** effect here */
  });

  return (
    <_Toolbar>
      <div className="toolbar-title">
        <span>
          {title}
        </span>
        <div>
          {formAction}
        </div>
      </div>
      <div className="toolbar-action">
        {children}
      </div>
    </_Toolbar>
  );
};