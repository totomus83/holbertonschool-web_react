import { Component } from 'react';
import BodySection from './BodySection';
import './BodySectionWithMarginBottom.css';

class BodySectionWithMarginBottom extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <div className="bodySectionWithMargin">
        <BodySection title={title}>
          {children}
        </BodySection>
      </div>
    );
  }
}

export default BodySectionWithMarginBottom;