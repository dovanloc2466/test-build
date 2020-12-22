import styled from 'styled-components';

export const BlankCard = styled.div`
  margin-bottom: 16px;
  padding: 24px 24px 0;
  background: #fff;

  .ant-form-item {
    margin-bottom: 24px;
    .ant-btn {
      &:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
`;