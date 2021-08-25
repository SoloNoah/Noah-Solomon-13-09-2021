import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { funcAsync } from '../../store/actions';

const ChildComponent = ({ string, funcAsync }) => {
  useEffect(() => {
    console.log(string);
    funcAsync('some value');
  }, []);

  return <div>child_component</div>;
};

const mapStateToProps = (state) => ({
  string: state.root.string,
});

const mapDispatchToProps = {
  funcAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
