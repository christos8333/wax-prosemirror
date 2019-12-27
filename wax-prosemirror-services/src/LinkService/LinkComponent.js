import React, { Component, PureComponent } from "react";

class LinkComponent extends PureComponent {
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps, this.props);
  //   if (nextProps == this.props) {
  //     debugger;
  //   }
  //   return nextProps;
  // }

  render() {
    console.log("paoooooooooo", this.props);
    return (
      <div>
        <input
          type="text"
          onChange={() => {
            //this.setState({ count: this.state.count + 1 });
          }}
        />
      </div>
    );
  }
}

export default LinkComponent;
