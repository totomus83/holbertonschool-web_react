import BodySectionWithMarginBottom from "./BodySectionWithMarginBottom";
import { render } from '@testing-library/react';

describe('BodySectionWithMarginBottom component', () => {
  test("Vérification le composant BodySectionWithMarginBottom génère une div avec la bonne classe", () => {
    const { container } = render(<BodySectionWithMarginBottom title={'Fallen of Albaz'}/>);
    const divElement = container.querySelector('.bodySectionWithMargin');
    expect(divElement).toBeInTheDocument();
  });

  test("Vérification le composant BodySection est bien rendu dans le composant BodySectionWithMarginBottom", () => {
    const { container } = render(
      <BodySectionWithMarginBottom title={'Fallen of Albaz'}>
        <p>Dragon/Effect</p>
      </BodySectionWithMarginBottom>
    );
    const divComponent = container.querySelector('.bodySection');
    expect(divComponent).toBeInTheDocument();
  });
});
