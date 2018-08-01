import * as React from "react";
import Sortable from 'sortablejs';
import styled from "styled-components";

class App extends React.Component {

	public dragulaDecorator = (componentBackingInstance) => {
		if (componentBackingInstance) {
			let options = {
				direction: 'horizontal'
			};
			const sortable = Sortable.create(componentBackingInstance);
		}
	};

	public componentDidMount() {
		const ele1 = document.getElementById('ele1');
		Sortable.create(ele1, { group: { name: 'shared', pull: true, put: true, revertClone: true } });
		const ele2 = document.getElementById('ele2');
		Sortable.create(ele2, { group: 'shared' });
	}

	public render() {
		return <div>
			<SBox id={'ele1'}>
				<div>1</div>
				<div>2</div>
				<div>3</div>
			</SBox>
			<SBox id={'ele2'} style={{ marginTop: 100 }}>
				<div>4</div>
				<div>5</div>
				<div>6</div>
			</SBox>
		</div>;
	}

}

export default App;

const SBox = styled.div`// styled
  & {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 100px;
      height: 100px;
      margin: 5px;
      color: white;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      background: blue;
    }
  }
`;
