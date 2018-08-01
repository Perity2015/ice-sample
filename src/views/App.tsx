import { inject } from "mobx-react";
import * as React from 'react';

@inject('userStore')
class App extends React.Component<any, any> {
	public render() {
		const { notice } = this.props.userStore;
		return (
			<div>{notice}</div>
		);
	}
}

export default App;
