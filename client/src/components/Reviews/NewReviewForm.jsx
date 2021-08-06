import React from 'react';
import FormStars from './FormStars';
import ClickTracker from './ClickTracker';
import API from './ReviewsAPIUtils';

const inititalState = {
  previews: null,
  files: {length: 0},
  rating: null,
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
  email: '',
  errorsToDisplay: []
};

class NewReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = inititalState;

    this.handleChange = this.handleChange.bind(this);
    this.handleStarReviewClick = this.handleStarReviewClick.bind(this);
  }

  validateEmail (email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }

  validateForm (characteristicChoices) {
    const errors = [];

    if (!this.state.rating) {
      errors.push(<li>You must choose a star rating</li>);
    }

    if (this.state.recommend === '') {
      errors.push(<li>You must choose a recommendation</li>);
    }

    characteristicChoices.forEach(choice => {
      if (this.state[choice] === '') {
        errors.push(<li key={choice} >You must select a value for {choice}</li>);
      }
    });

    if (!this.state.summary) {
      errors.push(<li>You must include a summary</li>);
    }

    if (!this.state.body) {
      errors.push(<li>You must include a body</li>);
    }

    if (this.state.body.length < 50) {
      errors.push(<li>You must include at least 50 characters in your review</li>);
    }

    if (!this.state.nickname) {
      errors.push(<li>You must include a nickname</li>);
    }

    if (!this.state.email || !this.validateEmail(this.state.email)) {
      errors.push(<li>You must include a valid email address</li>);
    }

    if (errors.length) {
      this.setState({
        errorsToDisplay: errors
      });
    }

    return !errors.length;
  }

  handleFiles () {
    const previews = [];
    for (let key in event.target.files) {
      if (key !== 'length' && key !== 'item') {
        previews.push(URL.createObjectURL(event.target.files[key]));
      }
    }
    if (event.target.files.length > 5) {
      alert('You may only upload 5 images');
      event.target.value = '';
      this.setState({
        files: {length: 0}
      });
    } else {
      let files = event.target.files;
      this.setState({
        files,
        previews
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

  handleStarReviewClick(rating) {
    this.setState({
      rating
    });
  }

  handleSubmit (characteristicChoices, characteristicIds) {
    event.preventDefault();



    if (this.validateForm(characteristicChoices)) {
      let formData = new FormData;
      if (this.state.files.length > 0) {
        for (let file of this.state.files) {
          formData.append('files', file);
        }
      }

      formData.append('product_id', this.props.productId);
      formData.append('rating', this.state.rating);
      formData.append('summary', this.state.summary);
      formData.append('body', this.state.body);
      formData.append('recommend', this.state.recommend);
      formData.append('name', this.state.nickname);
      formData.append('email', this.state.email);

      for (let key in characteristicIds) {
        formData.append('characteristics', characteristicIds[key]);
      }

      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      };

      API.submitFormData(formData, config)
        .then(response => {
          this.setState(inititalState);
          this.props.closeForm('close-form');
        })
        .catch(error => {
          console.log(error);
        });
    }
  }


  render () {
    const { characteristics } = this.props.currentProductMeta;
    const characteristicIds = {};
    const characteristicChoices = [];

    for (let characteristic in characteristics) {
      characteristicIds[characteristic.toLowerCase()] = `${characteristics[characteristic].id}-${this.state[characteristic.toLowerCase()]}`;
      characteristicChoices.push(characteristic.toLowerCase());
    }

    let minimumReached = false;
    const charactersLeft = 50 - this.state.body.length;
    if (this.state.body.length >= 50) {
      minimumReached = true;
    }

    let previews;
    if (Array.isArray(this.state.previews)) {
      previews = this.state.previews.map((file, index) => {
        return <img key={index} src={file} className="previews-thumbnail"/>;
      });
    }

    const selectedFileCount = this.state.files.length;


    return (
      <div id="review-form-wrapper" onClick={(e) => this.props.closeForm(e.target.id)}>
        <div id="close-form">X</div>

        <form className="review-form">
          <div className="review-form-row">
            <div></div>
            <div>
              <h3 >WRITE YOUR REVIEW</h3>
              <h4>About the {this.props.currentProductName}</h4>
            </div>
          </div>
          <div id="review-rating" className="review-form-row">
            <label className="label">Overall Rating:</label>
            <FormStars rating={this.state.rating} handleStarReviewClick={this.handleStarReviewClick}/>
          </div>

          <div id="review-recommend" className="review-form-row">
            <label className="label" onChange={this.handleChange}>Do you recommended this product?</label>
            <div>
              <input type="radio" value="Yes" name="recommend"
                onChange={this.handleChange}
                onClick={(e) => {
                  this.props.handleTrackingClick(e, e.currentTarget.className);
                }}
              /> Yes
              <input className="radio" type="radio" value="No" name="recommend"
                onChange={this.handleChange}
                onClick={(e) => {
                  this.props.handleTrackingClick(e, e.currentTarget.className);
                }}
              /> No
            </div>
          </div>

          {characteristicChoices.includes('size') &&
            <div id="review-size" className="review-form-row">
              <label className="label" >Size:</label>
              <div className="attributes-wrapper">
                <div className="attributes-row">
                  <span>A size too small</span>
                  <span>1/2 a size too small</span>
                  <span>Perfect</span>
                  <span>1/2 a size too big</span>
                  <span>A size too wide</span>
                </div>
                <div className="attributes-row">
                  <input type="radio" value="1" name="size" onChange={this.handleChange}/>
                  <input type="radio" value="2" name="size" onChange={this.handleChange}/>
                  <input type="radio" value="3" name="size" onChange={this.handleChange}/>
                  <input type="radio" value="4" name="size" onChange={this.handleChange}/>
                  <input type="radio" value="5" name="size" onChange={this.handleChange}/>
                </div>
              </div>
            </div>
          }

          {characteristicChoices.includes('width') &&
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
                  <input type="radio" value="1" name="width" onChange={this.handleChange}/>
                  <input type="radio" value="2" name="width" onChange={this.handleChange}/>
                  <input type="radio" value="3" name="width" onChange={this.handleChange}/>
                  <input type="radio" value="4" name="width" onChange={this.handleChange}/>
                  <input type="radio" value="5" name="width" onChange={this.handleChange}/>
                </div>
              </div>
            </div>
          }

          {characteristicChoices.includes('comfort') &&
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
                  <input type="radio" value="1" name="comfort" onChange={this.handleChange}/>
                  <input type="radio" value="2" name="comfort" onChange={this.handleChange}/>
                  <input type="radio" value="3" name="comfort" onChange={this.handleChange}/>
                  <input type="radio" value="4" name="comfort" onChange={this.handleChange}/>
                  <input type="radio" value="5" name="comfort" onChange={this.handleChange}/>
                </div>
              </div>
            </div>
          }

          {characteristicChoices.includes('quality') &&
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
                  <input type="radio" value="1" name="quality" onChange={this.handleChange}/>
                  <input type="radio" value="2" name="quality" onChange={this.handleChange}/>
                  <input type="radio" value="3" name="quality" onChange={this.handleChange}/>
                  <input type="radio" value="4" name="quality" onChange={this.handleChange}/>
                  <input type="radio" value="5" name="quality" onChange={this.handleChange}/>
                </div>
              </div>
            </div>
          }
          {characteristicChoices.includes('length') &&
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
                  <input type="radio" value="1" name="length" onChange={this.handleChange}/>
                  <input type="radio" value="2" name="length" onChange={this.handleChange}/>
                  <input type="radio" value="3" name="length" onChange={this.handleChange}/>
                  <input type="radio" value="4" name="length" onChange={this.handleChange}/>
                  <input type="radio" value="5" name="length" onChange={this.handleChange}/>
                </div>
              </div>
            </div>
          }
          {characteristicChoices.includes('fit') &&
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
                  <input type="radio" value="1" name="fit" onChange={this.handleChange}/>
                  <input type="radio" value="2" name="fit" onChange={this.handleChange}/>
                  <input type="radio" value="3" name="fit" onChange={this.handleChange}/>
                  <input type="radio" value="4" name="fit" onChange={this.handleChange}/>
                  <input type="radio" value="5" name="fit" onChange={this.handleChange}/>
                </div>
              </div>
            </div>
          }
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
            <input type="file" multiple
              onChange={(e) => this.handleFiles(e)}
              onClick={(e) => this.props.handleTrackingClick(e, e.currentTarget.className)}/>
          </div>
          }

          {this.state.previews !== null &&
            <div id="file-preview" className="review-form-row">
              <label className="label">File Previews:</label>
              <div>
                {previews}
              </div>
            </div>
          }

          <div className="review-form-row">
            <label className="label">What is your nickname?</label>
            <div>
              <input id="nickname" type="text" maxLength="60" placeholder="Example: jackson11!" name="nickname" value={this.state.nickname} onChange={this.handleChange} />
              <div className="review-form-extra-info">For privacy reasons, do not include your full name or email address</div>
            </div>

          </div>

          <div className="review-form-row">
            <label className="label">Your email?</label>
            <div>
              <input id="email" type="text" maxLength="60" placeholder="Example: jackson11@email.com!" name="email" value={this.state.email} onChange={this.handleChange} />
              <div className="review-form-extra-info">For authentication reasons, you will not be emailed</div>
            </div>
          </div>

          {this.state.errorsToDisplay.length > 0 &&

            <div className="review-form-row error-wrapper">
              <div></div>
              <div>
                <span>Please correct the following errors:</span>
                <ul className="error-list">
                  {this.state.errorsToDisplay}
                </ul>
              </div>
            </div>
          }

          <div className="review-form-row">
            <div></div>
            <input type="submit" className="btn submit-review" value="Submit Review" onClick={(e) => {
              this.handleSubmit(characteristicChoices, characteristicIds);
              this.props.handleTrackingClick(e, e.currentTarget.className);
            }}/>
          </div>

        </form>
      </div>
    );
  }

}

export default ClickTracker(NewReviewForm);
