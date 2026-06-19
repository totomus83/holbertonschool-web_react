import { Component } from "react";

class BodySection extends Component {
  render() {
    return(
      <div className="bodySection mt-auto">
        <h2 className="font-bold pl-4">{ this.props.title }</h2>
        {this.props.children}
      </div>
    )
  }
}

export default BodySection;
