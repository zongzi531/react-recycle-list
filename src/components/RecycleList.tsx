import * as React from 'react';
import './RecycleList.css';

interface IRLProps {
  data: any[]
  childrenHeight: number
}

interface IRLState {
  refWrapper: React.RefObject<HTMLDivElement>
  virtualHeight: number
}

export default class RecycleList extends React.Component<IRLProps, IRLState> {
  constructor(props: IRLProps) {
    super(props);
    this.state = {
      refWrapper: React.createRef(),
      virtualHeight: 0,
    };
  }

  public handleScroll = () => {
    const current = this.state.refWrapper.current as HTMLDivElement;
    // this.setVirtualHeight()
    // const { top: currentTop } = current.getBoundingClientRect();
    // tslint:disable-next-line:no-console
    console.log(current.getBoundingClientRect())
    // tslint:disable-next-line:no-console
    console.log(this.state.virtualHeight)
  }

  public setVirtualHeight () {
    // I can't use this function, because I can't get all children rendered DOM height.
    // So, i defined props.childrenHeight to get all children DOM height.
    // Now, i need currentDate as small as possible and currentDate translate attribute can following.
    const current = this.state.refWrapper.current as HTMLDivElement;
    this.setState({
      virtualHeight: Array.from(current.children).reduce((total, currentValue) => total += currentValue.clientHeight, 0)
    })
  }

  public get currentDate () {
    return this.props.data.slice(10,60)
  }

  public componentDidMount () {
    this.setState({
      virtualHeight: this.props.childrenHeight * this.props.data.length
    })
    window.addEventListener('scroll', this.handleScroll, true);
  }
  public componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  public render() {
    return (
      <div className="wrapper" ref={this.state.refWrapper}>
        <div className="virtual-wrapper" style={{
          height: this.state.virtualHeight
        }}>
          {
            this.currentDate.map((value, index) => {
              return (<div key={index}>{value}</div>)
            })
          }
        </div>
      </div>
    )
  }
}
