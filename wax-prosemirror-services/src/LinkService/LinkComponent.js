import React, { Component, PureComponent } from "react";

class LinkComponent extends PureComponent {
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps, this.props);
  //   if (nextProps == this.props) {
  //     debugger;
  //   }
  //   return nextProps;
  // }

  componentDidMount() {
    // this.props.setPosition({
    //   left: "500px",
    //   top: "100px",
    //   position: "absolute"
    // });
  }

  render() {
    console.log("render link Component");
    return (
      <div>
        <input
          type="text"
          onChange={() => {
            // this.props.setPosition({
            //   left: "500px",
            //   top: "100px",
            //   position: "absolute"
            // });
            //this.setState({ count: this.state.count + 1 });
          }}
        />
      </div>
    );
  }
}

export default LinkComponent;
