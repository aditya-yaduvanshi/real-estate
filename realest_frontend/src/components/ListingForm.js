import React, { useState } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types'

const ListingForm = (props) => {
  const [formData, setFormData] = useState({
    sale_type: 'For Sale',
    price: 0,
    bedrooms: 0,
    home_type: 'House',
    bathrooms: 0.0,
    sqft: 'Any',
    days_listed: 'Any',
    has_photos: 1,
    open_house: 'false',
    keywords: ''
  })
  const {sale_type,price,bedrooms,home_type,bathrooms,sqft,days_listed,has_photos,open_house,keywords} = formData;
  const [loading, setLoading] = useState(false)
  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    axios.defaults.headers = {
      'Content-Type': 'application/json'
    }
    setLoading(true)
    axios.post('http://localhost:8000/api/listings/search', JSON.stringify({
      sale_type,
      price: price,
      bedrooms: bedrooms,
      home_type,
      bathrooms: bathrooms,
      sqft: sqft,
      days_listed: days_listed,
      has_photos: has_photos,
      open_house,
      keywords
    })).then(res => {
      setLoading(false)
      props.setListings(res.data)
      console.log(res.data)
      window.scrollTo(0,0)
    }).catch(err => {
      setLoading(false)
      window.scrollTo(0,0)
      console.error(err);
    })
  }
  
  return (
    <form className="listing__form" onSubmit={event => handleSubmit(event)}>
      <div className="listing__form__row">

        <div className="listing__form__col listing__form__col__submit">
          <div className="listingform__section listingform__submit">
            <button type="submit" className="listingform__submit__button">
              {loading ? (
                <label className="listing__form__button__loader">
                  <Loader 
                    type='Oval'
                    color='#FFF'
                    height={16}
                    width={16} 
                  />
                </label>
              ) : (
                <>
                  Apply Filters
                </>
              )}
            </button>
          </div>
        </div>

        <div className="listing__form__col">

          <div className="listingform__section">
            <label className="listingform__label" htmlFor="sale_type">Sale or Rent</label>
            <select className="listingform__select" name="sale_type" onChange={event => handleChange(event)} value={sale_type}>
              <option defaultValue>For Sale</option>
              <option>For Rent</option>
            </select>
          </div>

          <div className="listingform__section">
            <label className="listingform__label" htmlFor="sqft">Square Feet</label>
            <select className="listingform__select" name="sqft" onChange={event => handleChange(event)} value={sqft}>
              <option value="1000">1000+</option>
              <option value="1200">1200+</option>
              <option value="1500">1500+</option>
              <option value="2000">2000+</option>
              <option defaultValue>Any</option>
            </select>
          </div>

        </div>

        <div className="listing__form__col">

          <div className="listingform__section">
            <label className="listingform__label" htmlFor="price">Minimum price</label>
            <select className="listingform__select" name="price" onChange={event => handleChange(event)} value={price}>
              <option value="0" defaultValue>INR 0+ Lakh</option>
              <option value="200">INR 200+ Lakh</option>
              <option value="400">INR 400+ Lakh</option>
              <option value="600">INR 600+ Lakh</option>
              <option value="800">INR 800+ Lakh</option>
              <option value="1000">INR 1000+ Lakh</option>
              <option value="1200">INR 1200+ Lakh</option>
              <option value="1500">INR 1500+ Lakh</option>
            </select>
          </div>

          <div className="listingform__section">
            <label className="listingform__label" htmlFor="days_listed">Days Listed</label>
            <select className="listingform__select" name="days_listed" onChange={event => handleChange(event)} value={days_listed}>
              <option value="1">1 or less</option>
              <option value="2">2 or less</option>
              <option value="5">5 or less</option>
              <option value="10">10 or less</option>
              <option value="20">20 or less</option>
              <option defaultValue>Any</option>
            </select>
          </div>

        </div>

        <div className="listing__form__col">

          <div className="listingform__section">
            <label className="listingform__label" htmlFor="bedrooms">Bedrooms</label>
            <select className="listingform__select" name="bedrooms" onChange={event => handleChange(event)} value={bedrooms}>
              <option value="0" defaultValue>0 or more</option>
              <option value="1">1 or more</option>
              <option value="2">2 or more</option>
              <option value="3">3 or more</option>
              <option value="4">4 or more</option>
              <option value="5">5 or more</option>
              <option>Any</option>
            </select>
          </div>

          <div className="listingform__section">
            <label className="listingform__label" htmlFor="has_photos">Has Photos</label>
            <select className="listingform__select" name="has_photos" onChange={event => handleChange(event)} value={has_photos}>
              <option value="1" defaultValue>1 or more</option>
              <option value="2">2 or more</option>
              <option value="5">5 or more</option>
              <option value="10">10 or more</option>
              <option value="15">15 or more</option>
              <option>Any</option>
            </select>
          </div>

        </div>

        <div className="listing__form__col">

          <div className="listingform__section">
            <label className="listingform__label" htmlFor="home_type">Home type</label>
            <select className="listingform__select" name="home_type" onChange={event => handleChange(event)} value={home_type}>
              <option defaultValue>House</option>
              <option>Condo</option>
              <option>Townhouse</option>
            </select>
          </div>

          <div className="listingform__section">
            <label className="listingform__label" htmlFor="bathrooms">Bathrooms</label>
            <select className="listingform__select" name="bathrooms" onChange={event => handleChange(event)} value={bathrooms}>
              <option defaultValue>0.0</option>
              <option>1.0</option>
              <option>2.0</option>
              <option>3.0</option>
              <option>4.0</option>
              <option>5.0</option>
            </select>
          </div>

        </div>

        <div className="listing__form__col">
          
          <div className="listingform__section">
            <label className="listingform__label" htmlFor="keywords">Keywords</label>
            <input className="listingform__input" type="text" name="keywords" onChange={event => handleChange(event)} value={keywords} />
          </div>

          <div className="listingform__altsection">
            <label className="listingform__label" htmlFor="open_house">Open Houses</label>
            <input className="listingform__checkbox" type="checkbox" name="open_house" onChange={event => handleChange(event)} value={open_house} />
          </div>

        </div>

      </div>
    </form>
  )
}

ListingForm.propTypes = {
  setListings: PropTypes.func.isRequired
}

export default ListingForm