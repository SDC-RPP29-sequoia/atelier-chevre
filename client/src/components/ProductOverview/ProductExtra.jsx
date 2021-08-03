import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

const ProductExtra = (props) => (
  <div id="product-extra">
    <div id="product-description">
      <h4 id="description-title">Product slogan or catchphrase...</h4>
      <p id="description">Spicy jalapeno bacon ipsum dolor amet burgdoggen pork belly esse bacon, bresaola strip steak ut drumstick eiusmod chicken flank ea sed. Laboris corned beef aliqua sausage pancetta ball tip rump bacon qui spare ribs nostrud. Hamburger beef incididunt, cow fugiat do prosciutto pastrami filet mignon pancetta deserunt lorem sausage <br /><br />andouille picanha. Ham cupidatat ipsum, spare ribs esse velit kielbasa magna in doner cupim. Dolore reprehenderit adipisicing ullamco.

        Short loin dolore cow laborum culpa velit nostrud irure.  Qui pork loin nisi bresaola cillum anim pig salami dolore nostrud.</p>
    </div>
    <div id="product-features">
      <div className="feature">
        <div className="check">
          <AiOutlineCheck />
        </div>
        <p>GMO and Pesticide-free</p>
      </div>

      <div className="feature">
        <div className="check">
          <AiOutlineCheck />
        </div>
        <p>Made with 100% genetic modification</p>
      </div>

      <div className="feature">
        <div className="check">
          <AiOutlineCheck />
        </div>
        <p>This is made up</p>
      </div>
    </div>
  </div>
);

export default ProductExtra;