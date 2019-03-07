import addons, { makeDecorator, types } from '@storybook/addons';
import React from 'react';
import PropTypesPanel from './PropTypesPanel';

export const withPropTypes = makeDecorator({
  name: 'withPropTypes',
  parameterName: 'propTypes',
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context) => {
    return getStory(context);
  },
});

export const register = () => {
  const ADDON_ID = 'with-prop-types';
  const PANEL_ID = `${ADDON_ID}/panel`;

  addons.register(ADDON_ID, api => {
    const render = ({ active }) => (
      <PropTypesPanel key={ADDON_ID} api={api} active={active} />
    );
    const title = 'PropTypes';

    addons.add(PANEL_ID, {
      type: types.PANEL,
      title,
      render,
    });
  });
}
