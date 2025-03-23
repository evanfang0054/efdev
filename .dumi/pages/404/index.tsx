import React from 'react';
import { Link, useIntl } from 'dumi';
import { Result } from 'antd';

const App: React.FC = () => {
  const intl = useIntl();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to={'/'} replace>
          {intl.formatMessage({ id: '404.back' })} →
        </Link>
      }
    />
  );
};

export default App;
