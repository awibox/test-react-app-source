import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { getHomeAction } from 'actions/homeActions';
import { Map } from 'immutable';
// Components
import HomeInfo from 'components/HomeInfo/HomeInfo';
import Alert from 'components/Alert/Alert';
import Loader from 'components/Loader/Loader';
// Selectors
import { getHomeSelector } from 'selectors/homeSelectors';
import { getErrorsSelector } from 'selectors/errorSelectors';

class HomeContainer extends Component {
  static propTypes = {
    getHomeAction: PropTypes.func.isRequired,
    home: ImmutablePropTypes.contains({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      html_url: PropTypes.string.isRequired,
    }),
    errors: PropTypes.shape({
      message: PropTypes.string,
    }),
  };

  static defaultProps = {
    home: Map({
      name: '',
      description: '',
      html_url: '',
    }),
  };

  componentDidMount() {
    this.props.getHomeAction();
  }

  render() {
    const { home, errors } = this.props;
    return (
      <div>
        {typeof errors.message !== 'undefined' && <Alert>{errors.message}</Alert>}
        <HomeInfo home={home}/>
        <Loader/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  home: getHomeSelector(state),
  errors: getErrorsSelector(state),
});

export default connect(mapStateToProps, { getHomeAction })(HomeContainer);
