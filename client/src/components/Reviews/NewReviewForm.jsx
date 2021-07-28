import React from 'react';

class NewReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: {length: 0},
      rating: '',
      recommend: '',
      size: '',
      width: '',
      comfort: '',
      quality: '',
      length: '',
      fit: '',
      summary: '',
      body: '',
      nickname: '',
      email: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleFiles () {
    console.log('event.target.files:', event.target.files.length);

    if (event.target.files.length > 5) {
      alert('You may only upload 5 images');
      event.target.value = '';
      this.setState({
        files: {length: 0}
      });
    } else {
      let files = event.target.files;
      this.setState({
        files
      });
    }
  }

  handleChange() {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }


  render () {
    let minimumReached = false;
    const charactersLeft = 50 - this.state.body.length;
    if (this.state.body.length >= 50) {
      minimumReached = true;
    }

    console.log(this.state.files.length);

    const selectedFileCount = this.state.files.length;

    return (
      <div id="review-form-wrapper" onClick={(e) => this.props.closeForm(e.target.id)}>
        <div id="close-form">X</div>
        <form className="review-form">
          <div id="review-rating" className="review-form-row">
            <label className="label">Overall Rating:</label>
            <input className="text-input" type="text" name="rating" value={this.state.rating} onChange={this.handleChange}></input>
          </div>
          <div id="review-recommend" className="review-form-row">
            <label className="label" onChange={this.handleChange}>Do you recommended this product?</label>
            <div>
              <input type="radio" value="Yes" name="recommend" /> Yes
              <input className="radio" type="radio" value="No" name="recommend"/> No
            </div>
          </div>
          <div id="review-size" className="review-form-row">
            <label className="label" onChange={this.handleChange}>Size:</label>
            <div className="attributes-wrapper">
              <div className="attributes-row">
                <span>A size too small</span>
                <span>1/2 a size too small</span>
                <span>Perfect</span>
                <span>1/2 a size too big</span>
                <span>A size too wide</span>
              </div>
              <div className="attributes-row">
                <input type="radio" value="1" name="size" />
                <input type="radio" value="2" name="size"/>
                <input type="radio" value="3" name="size" />
                <input type="radio" value="4" name="size"/>
                <input type="radio" value="5" name="size"/>
              </div>
            </div>
          </div>
          <div id="review-width" className="review-form-row">
            <label className="label" onChange={this.handleChange}>Width:</label>
            <div className="attributes-wrapper">
              <div className="attributes-row">
                <span>Too narrow</span>
                <span>Slightly narrow</span>
                <span>Perfect</span>
                <span>Slightly wide</span>
                <span>Too wide</span>
              </div>
              <div className="attributes-row">
                <input type="radio" value="1" name="width" />
                <input type="radio" value="2" name="width"/>
                <input type="radio" value="3" name="width" />
                <input type="radio" value="4" name="width"/>
                <input type="radio" value="5" name="width"/>
              </div>
            </div>

          </div>
          <div id="review-comfort" className="review-form-row">
            <label className="label" onChange={this.handleChange}>Comfort:</label>
            <div className="attributes-wrapper">
              <div className="attributes-row">
                <span>Uncomfortable</span>
                <span>Slightly uncomfortable</span>
                <span>Ok</span>
                <span>Comfortable</span>
                <span>Perfect</span>
              </div>
              <div className="attributes-row">
                <input type="radio" value="1" name="comfort" />
                <input type="radio" value="2" name="comfort"/>
                <input type="radio" value="3" name="comfort" />
                <input type="radio" value="4" name="comfort"/>
                <input type="radio" value="5" name="comfort"/>
              </div>
            </div>
          </div>
          <div id="review-quality" className="review-form-row">
            <label className="label" onChange={this.handleChange}>Quality:</label>
            <div className="attributes-wrapper">
              <div className="attributes-row">
                <span>Poor</span>
                <span>Below average</span>
                <span>What I expected</span>
                <span>Pretty great</span>
                <span>Perfect</span>
              </div>
              <div className="attributes-row">
                <input type="radio" value="1" name="quality" />
                <input type="radio" value="2" name="quality"/>
                <input type="radio" value="3" name="quality" />
                <input type="radio" value="4" name="quality"/>
                <input type="radio" value="5" name="quality"/>
              </div>
            </div>
          </div>
          <div id="review-length" className="review-form-row">
            <label className="label" onChange={this.handleChange}>Length:</label>
            <div className="attributes-wrapper">
              <div className="attributes-row">
                <span>Runs short</span>
                <span>Runs slightly short</span>
                <span>Perfect</span>
                <span>Runs slightly long</span>
                <span>Runs long</span>
              </div>
              <div className="attributes-row">
                <input type="radio" value="1" name="length" />
                <input type="radio" value="2" name="length"/>
                <input type="radio" value="3" name="length" />
                <input type="radio" value="4" name="length"/>
                <input type="radio" value="5" name="length"/>
              </div>
            </div>
          </div>
          <div id="review-fit" className="review-form-row">
            <label className="label" onChange={this.handleChange}>Fit:</label>
            <div className="attributes-wrapper">
              <div className="attributes-row">
                <span>Runs tight</span>
                <span>Runs slightly short</span>
                <span>Perfect</span>
                <span>Runs slightly loose</span>
                <span>Runs loose</span>
              </div>
              <div className="attributes-row">
                <input type="radio" value="1" name="fit" />
                <input type="radio" value="2" name="fit"/>
                <input type="radio" value="3" name="fit" />
                <input type="radio" value="4" name="fit"/>
                <input type="radio" value="5" name="fit"/>
              </div>
            </div>
          </div>
          <div id="review-summary" className="review-form-row">
            <label className="label">Summary:</label>
            <input className="review-text" type="text" name="summary" maxLength="60" placeholder="Example: Best purchase ever!" value={this.state.summary} onChange={this.handleChange}/>

          </div>
          <div id="review-body" className="review-form-row">
            <label className="label two-column">Body:</label>
            <div>
              <textarea className="review-text-body" minLength="50" maxLength="1000" name="body" placeholder="Why did you like the product or not?" value={this.state.body} onChange={this.handleChange}></textarea>
              {!minimumReached &&
                <div className="review-form-extra-info">Miminum required characters left: {charactersLeft}</div>
              }
              {minimumReached &&
                <div className="review-form-extra-info">Miminum reached</div>
              }
            </div>
          </div>
          {selectedFileCount < 5 &&
          <div id="review-files" className="review-form-row">
            <label className="label">Upload up to 5 images:</label>
            <input type="file" multiple onChange={(e) => this.handleFiles(e)}/>
          </div>
          }
          <div className="review-form-row">
            <label className="label">What is your nickname?</label>
            <input id="nickname" type="text" maxLength="60" placeholder="Example: jackson11!" name="nickname" value={this.state.nickname} onChange={this.handleChange} />

          </div>
          <div className="review-form-row">
            <label className="label">Your email?</label>
            <div>
              <input id="email" type="text" maxLength="60" placeholder="Example: jackson11@email.com!" name="email" value={this.state.email} onChange={this.handleChange} />
              <div className="review-form-extra-info">For authentication reasons, you will not be emailed</div>
            </div>

          </div>
          <div className="review-form-row">
            <div></div>
            <input type="submit" className="btn" value="Submit Review" />
          </div>
        </form>
      </div>
    );
  }

}

export default NewReviewForm;
