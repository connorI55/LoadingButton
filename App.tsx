import * as React from 'react';
import LongPressButton, {IButtonProps} from './longPressButton';

export default class MUI_LoadingButton_Class extends React.Component<IButtonProps> {
  public render(): React.ReactNode {
    const props = this.props;
    return (
      <LongPressButton {...props} />
    )
  }
}
