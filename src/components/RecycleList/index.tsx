
import * as React from 'react';
import { CalcChilds } from '../_util';
import './index.css';

interface IRLProps {
  className?: string
  childrenHeight: (child?: React.ReactNode) => number
  style?: React.CSSProperties
}

interface IRLState {
  childrenCount: number
  refVirtualWrapper: React.RefObject<HTMLDivElement>
  refWrapper: React.RefObject<HTMLDivElement>
  startChildren: number
  topRange: number
  virtualHeight: number
  virtualwrapperTop: number
  wrapperHeight: number
}

export default class RecycleList extends React.Component<IRLProps, IRLState> {
  constructor(props: IRLProps) {
    super(props);
    this.state = {
      childrenCount: 0,
      refVirtualWrapper: React.createRef(),
      refWrapper: React.createRef(),
      startChildren: 0,
      topRange: 0,
      virtualHeight: 0,
      virtualwrapperTop: 0,
      wrapperHeight: 0,
    };
  }

  public handleScroll = () => {
    // get wrapper wrapper ref current property
    const virtualCurrent = this.state.refVirtualWrapper.current;
    // current could be null
    if (virtualCurrent) {
      // get top, wrapper height, children height
      const { top } = virtualCurrent.getBoundingClientRect()
      const { wrapperHeight, topRange } = this.state
      const { childrenHeight } = this.props
      const virtualwrapperTop = top - topRange
      // calculating need show children nodes in virtual wrapper
      // here has bugs.
      const childrenCount = Math.ceil(wrapperHeight / childrenHeight())
      const startChildren = Math.floor(Math.abs(virtualwrapperTop) / childrenHeight())
      this.setState({
        childrenCount,
        startChildren,
        virtualwrapperTop,
      })
    }
  }

  public init() {
    const current = this.state.refWrapper.current;
    const virtualCurrent = this.state.refVirtualWrapper.current;
    if (current && virtualCurrent) {
      const { top: topRange } = virtualCurrent.getBoundingClientRect()
      const { height } = current.getBoundingClientRect()
      const calcChilds = new CalcChilds({
        children: this.props.children as any,
        childrenHeight: this.props.childrenHeight,
      });
      // tslint:disable-next-line:no-console
      console.log(calcChilds)
      this.setState({
        topRange,
        virtualHeight: calcChilds.height,
        wrapperHeight: height,
      }, () => {
        this.handleScroll()
      })
    }
  }

  public get currentData() {
    return React.Children.map(this.props.children, (child: any, i) => {
      if (i < this.state.startChildren || i > this.state.startChildren + this.state.childrenCount) {
        return
      }
      return React.cloneElement(child, {
        ...child.props,
        style: {
          ...child.props.style,
          transform: this.translateY,
        }
      }, ...child.props.children)
    })
  }

  public get translateY() {
    const { childrenHeight } = this.props;
    const translateY = Math.abs(this.state.virtualwrapperTop) - Math.abs(this.state.virtualwrapperTop) % childrenHeight();
    return `translateY(${translateY}px)`;
  }

  public componentDidMount() {
    this.init()
  }

  public render() {
    return (
      <div
        className={'wrapper ' + this.props.className}
        // style={{ height: this.state.wrapperHeight }}
        ref={this.state.refWrapper}
        onScroll={this.handleScroll}>
        <div
          className="virtual-wrapper"
          ref={this.state.refVirtualWrapper}
          style={{
            height: this.state.virtualHeight
          }}>
          {this.currentData}
        </div>
      </div>
    )
  }
}
