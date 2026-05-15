/*

*/

// react input two-way-binding.
// 受控 非受控
class ControlledInput extends React.Component {
  state = {
    val: 1
  };
  componentWillReceiveProps(nextProps) {
    // this.setState({ val: nextProps.val });
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.value);
  }
  onChange = () => {
    this.setState({ value: Math.random() });
  }
  render() {
    return (
      <div>
        <h3>controlled input</h3>
        <input value={this.state.val}/>
        <br/>
        <h3>Uncontrolled input</h3>
        <input defaultValue={this.state.value} onChange={evt => {
          console.log('evt: ', evt.target.value);
          this.onChange();
        }} />
      </div>
    );
  }
}


// "rc-animate": "^2.4.4",
// "rc-queue-anim": "^1.5.0",
// "rc-scroll-anim": "^2.4.1",
// "rc-tween-one": "^1.7.3",
import ScrollAnim from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import Animate from 'rc-animate';
import QueueAnim from 'rc-queue-anim';
const Index = () => {
  return (<div>
    <div style={{ height: 500, background: 'tan' }}>
      <QueueAnim key="1" type="bottom">
        <div key="0" style={{ margin: '30px auto', width: 600, height: 80, backgroundColor: '#133252'}}></div>
        <div key="1" style={{ margin: '30px auto', width: 600, height: 80, backgroundColor: '#F38EAD'}}></div>
        <div key="2" style={{ margin: '30px auto', width: 600, height: 80, backgroundColor: '#133252'}}></div>
        <div key="3" style={{ margin: '30px auto', width: 600, height: 80, backgroundColor: '#133252'}}></div>
      </QueueAnim>
    </div>
    <ScrollAnim.OverPack
      style={{ width: '100%', height: 1000, backgroundColor: '#174270' }}
      playScale={0.8}
    >
      <TweenOne
        animation={{ opacity: 1 }}
        style={{ opacity: 0, textAlign: 'center', color: '#fff', fontSize: 32, padding: 160, }}
        key="title"
      >
        在页面80％时进入
      </TweenOne>
      <Animate key="0" transitionName="fade" transitionAppear>
        <div style={{ margin: '30px auto', width: 600, height: 80, backgroundColor: '#133252'}}></div>
      </Animate>
      <TweenOne
        style={{
          margin: '30px auto', width: 600, height: 80, backgroundColor: '#133252',
          transform: 'translateY(100px)', opacity: 0
        }}
        animation={{ y: 0, opacity: 1 }}
        key="1"
      />
    </ScrollAnim.OverPack>
  </div>);
}
