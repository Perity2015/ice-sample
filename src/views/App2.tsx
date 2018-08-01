import { $ButtonMV } from "@common/calsses/mv/$ButtonMV";
import { autowired } from "@common/ioc";
import { Button } from "antd-mobile";
import { observer } from "mobx-react";
import React from "react";

@observer
class App2 extends React.Component<any, any> {

	@autowired($ButtonMV)
	public $buttonMv: $ButtonMV;

	constructor(props) {
		super(props);
		this.state = {};
	}

	public componentDidMount() {
		console.log(this.$buttonMv)
		console.log(this.props)
	}

	public render() {
		const { buttons } = this.$buttonMv;
		return (
			<div>
				{
					buttons.map((item, index) => <Button key={item.id}>
						{item.name}
					</Button>)
				}
				<Button onClick={() => this.$buttonMv.addNewButton()}>
					添加
				</Button>
			</div>
		);
	}
}

export default App2;
