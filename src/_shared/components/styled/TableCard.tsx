import styled from 'styled-components';

export const TableCard = styled.div`
  padding: 24px 24px 0 24px;
  background: #fff;

  .ant-table-wrapper {
    margin: 0 -24px;
    max-width: unset;

    .ant-table-content {
      tr:first-child > th:first-child,
      tr > td:first-child {
        padding-left: 24px;
      }

      tr:last-child > th:last-child,
      tr > td:last-child {
        padding-right: 24px;
      }
    }

    .ant-pagination {
      float: unset;
      text-align: center;
    }
  }
`;