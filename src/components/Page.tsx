import React from "react";
import styled from "styled-components";

export interface IPageProps {
    style?: React.CSSProperties | any;
    type?: 'normal' | 'center' | 'flex' | 'flex-column';
}

class Page extends React.Component<IPageProps, any> {

    public static defaultProps = {
        style: {},
        type: 'normal'
    };

    public render() {
        const {style, type = 'normal'} = this.props;
        const PageMap = {
            'normal': SPage,
            'center': SCenterPage,
            'flex': SFlexPage,
            'flex-column': SFlexColumnPage
        };
        const Temp = PageMap[type];
        return (<Temp style={style}> {this.props.children}</Temp>);
    }
}

export default Page;

const SPage = styled.div`// styled
  & {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background-size: 100% 100%;
  }
`;

const SFlexPage = styled(SPage)`// styled
  & {
    display: flex;
    overflow: hidden;
  }
`;

const SFlexColumnPage = styled(SFlexPage)`// styled
  & {
    flex-direction: column;
  }
`;

const SCenterPage = styled(SFlexPage)`// styled
  & {
    align-items: center;
    justify-content: center;
  }
`;