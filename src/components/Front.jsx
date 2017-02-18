import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Front extends Component {
  constructor (props) {
    super (props);
  }
  componentDidMount () {
    this._resize ();

    /** Adds an event listener to the contents inside the subtree;
        this will resize the flipper whenever the subtree contents change **/
    ReactDOM.findDOMNode (this)
      .addEventListener ('DOMSubtreeModified', this._resize);
  }
  componentWillUnmount () {
    /** As our component will unmount, the active event listener
        is no longer needed, therefore it is important to remove it **/
    ReactDOM.findDOMNode (this)
      .removeEventListener ('DOMSubtreeModified', this._resize);
  }
  componentDidUpdate () {
    this._resize ();
  }
  shouldComponentUpdate (nextProps, nextState) {
    return this.props.isFront !== nextProps.isFront;
  }
  _resize = () => {
    if (this.props.isFront) this.props.resize (this._getHeight ());
  }
  _getHeight = () => {
    return ReactDOM.findDOMNode (this.refs.frontTile).offsetHeight;
  }
  _getClassName = () => {
    return this.props.className
      ? ('front tile ' + this.props.className)
      : 'front tile';
  }
  render () {
    let { className, isFront, resize, ...props } = this.props;
    return <div className={this._getClassName ()} ref="frontTile" {...props}>
      {this.props.children}
    </div>;
  }
}
