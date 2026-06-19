import { Component } from 'react';

class BodySection extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <div className="bodySection p-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {children}
      </div>
    );
  }
}

export default BodySection;