import * as React from 'react';
import { Label } from '@fluentui/react';

export interface iInputs {
  name?: string;
}

export class App extends React.Component<iInputs> {
  public render(): React.ReactNode {
    return (
      <Label>
        {this.props.name}
      </Label>
    )
  }
}
