import { Component } from 'react';
import BodySection from './BodySection';

class BodySectionWithMarginBottom extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <div className="bodySectionWithMargin mb-10">
        <BodySection title={title}>
          {children}
        </BodySection>
      </div>
    );
  }
}

export default BodySectionWithMarginBottom;