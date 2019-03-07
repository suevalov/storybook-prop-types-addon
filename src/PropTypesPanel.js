import React from 'react';
import { STORY_RENDERED } from '@storybook/core-events';
import _ from 'lodash';
import PropTypesTable from './PropTypesTable';
import EmptyState from './EmptyState';

export default class PropTypesPanel extends React.Component {
  state = { types: [] };

  componentDidMount() {
    const { api } = this.props;
    api.on(STORY_RENDERED, this.onStoryChange);
  }

  componentWillUnmount() {
    const { api } = this.props;
    api.off(STORY_RENDERED, this.onStoryChange);
  }

  onStoryChange = id => {
    const { api } = this.props;
    let types = api.getParameters(id, 'propTypes') || [];
    if (!_.isArray(types)) {
      types = [types];
    }

    this.setState({ types });
  };

  render() {
    const { types } = this.state;
    const { active } = this.props;
    if (!active) {
      return null;
    }

    if (types.length === 0) {
      return <EmptyState />;
    }

    return types.map((type, i) => (
      <PropTypesTable
        key={i}
        name={type.displayName}
        propDefinitions={_.values(type.props)}
      />
    ));
  }
}
