import * as React from 'react';
import './RecycleList.css';

interface IRLProps {
  data: any[]
  childrenHeight: number
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
    const virtualCurrent = this.state.refVirtualWrapper.current as HTMLDivElement;
    // current could be null
    if (virtualCurrent) {
      // get top, wrapper height, children height
      const { top } = virtualCurrent.getBoundingClientRect()
      const { wrapperHeight, topRange } = this.state
      const { childrenHeight } = this.props
      const virtualwrapperTop = top - topRange
      // calculating need show children nodes in virtual wrapper
      const childrenCount = Math.ceil(wrapperHeight / childrenHeight)
      const startChildren = Math.floor(Math.abs(virtualwrapperTop) / childrenHeight)
      this.setState({
        childrenCount,
        startChildren,
        virtualwrapperTop,
      })
    }
  }

  public init () {
    const current = this.state.refWrapper.current as HTMLDivElement;
    const virtualCurrent = this.state.refVirtualWrapper.current as HTMLDivElement;
    if (current && virtualCurrent) {
      const { top: topRange } = virtualCurrent.getBoundingClientRect()
      const { height } = current.getBoundingClientRect()
      const { childrenHeight, data } = this.props
      this.setState({
        topRange,
        virtualHeight: childrenHeight * data.length,
        wrapperHeight: height,
      }, () => {
        this.handleScroll()
      })
    }
  }

  public get currentDate () {
    return this.props.data.slice(this.state.startChildren, this.state.startChildren + this.state.childrenCount)
  }

  public get translateY () {
    const { childrenHeight } = this.props;
    const translateY = Math.abs(this.state.virtualwrapperTop) - Math.abs(this.state.virtualwrapperTop) % childrenHeight;
    return `translateY(${translateY}px)`;
  }

  public componentDidMount () {
    this.init()
  }

  public render() {
    return (
      <div className="wrapper" ref={this.state.refWrapper} onScroll={this.handleScroll}>
        <div className="virtual-wrapper" ref={this.state.refVirtualWrapper} style={{
          height: this.state.virtualHeight
        }}>
          {
            this.currentDate.map((value, index) => {
              return (<div key={index} style={{
                fontSize: '14px',
                lineHeight: '19px',
                transform: this.translateY,
              }}>{value} [top:{this.state.virtualwrapperTop}]</div>)
            })
          }
        </div>
      </div>
    )
  }
}
