import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListingDetail = (props) => {
  const [listing, setListing] = useState({});
  const [realtor, setRealtor] = useState({});
  const [price, setPrice] = useState(0);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  useEffect(() => {
    const slug = props.match.params.id;
    const config = {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.get(`http://localhost:8000/api/listings/${slug}`, config)
    .then(res => {
      setListing(res.data);
      setPrice(numberWithCommas(res.data.price));
    }).catch(err => {
      console.log(err);
    })
  }, [props.match.params.id]);

  useEffect(() => {
    const id = listing.realtor;
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    if(id){
      axios.get(`http://localhost:8000/api/realtors/${id}`, config)
      .then(res => {
        setRealtor(res.data);
      }).catch(err => {
        console.log(err);
      })
    }
  }, [listing.realtor]);

  const displayInteriorImages = () => {
    let images = [];
    if(listing.photos) {
      for(let index = 0; index < listing.photos.length; index += 3){
        images.push(
          <div className="row" key={index+1}>
            <div className="col-1-of-3">
              { listing.photos[index] ? (
                <div className="listingdetail__display" key={listing.photos[index].id}>
                  <img src={listing.photos[index].picture} alt={listing.photos[index].id} className="listingdetail__display__image" />
                </div>
              ) : null }
            </div>
            <div className="col-1-of-3">
              { listing.photos[index+1] ? (
                <div className="listingdetail__display" key={listing.photos[index+1].id}>
                  <img src={listing.photos[index+1].picture} alt={listing.photos[index+1].id} className="listingdetail__display__image" />
                </div>
              ) : null }
            </div>
            <div className="col-1-of-3">
              { listing.photos[index+2] ? (
                <div className="listingdetail__display" key={listing.photos[index+2].id}>
                  <img src={listing.photos[index+2].picture} alt={listing.photos[index+2].id} className="listingdetail__display__image" />
                </div>
              ) : null }
            </div>
          </div>
        )
      }
    }

    return images;
  }


  return (
    <div className="listingdetail">
      <Helmet>
        <title>Real Estate | {`${listing.title}`}</title>
        <meta name="title" content={`${listing.title}`} />
        <meta name="description" content={`${listing.description}`} />
      </Helmet>
      <div className="listingdetail__header">
        <h1 className="listingdetail__title">{listing.title}</h1>
        <p className="listingdetail__location">
          {listing.city}, {listing.state}, {listing.zipcode}
        </p>
      </div>
      <div className="row">
        <div className="listingdetail__breadcrumb">
          <Link to="/" className="listingdetail__breadcrumb__link">Home</Link> / {listing.title}
        </div>
      </div>
      <div className="row">
        <div className="col-3-of-4">
          <div className="listingdetail__display">
            <img src={listing.main_photo} alt="listing" className="listingdetail__display__image" />
          </div>
        </div>
        <div className="col-1-of-4">
          <div className="listingdetail__realtor">
            <div className="listingdetail__display">
              <img src={realtor.photo} alt="realtor" className="listingdetail__display__image" />
            </div>
            <h3 className="listingdetail__name">{realtor.name}</h3>
            <p className="listingdetail__contact">{realtor.email}</p>
            <p className="listingdetail__contact">{realtor.phone}</p>
            <p className="listingdetail__about">{realtor.description}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-1-of-2">
          <ul className="listingdetail__list">
            <li className="listingdetail__list__item" key={listing.home_type}>Home Type : {listing.home_type}</li>
            <li className="listingdetail__list__item" key={listing.sale_type}>Sale Type : {listing.sale_type}</li>
            <li className="listingdetail__list__item" key={listing.price}>Price : INR {listing.price} Lakh</li>
            <li className="listingdetail__list__item" key={listing.bedrooms}>Bedrooms : {listing.bedrooms} BHK</li>
            <li className="listingdetail__list__item" key={listing.bathrooms}>Bathrooms : {listing.bathrooms}</li>
            <li className="listingdetail__list__item" key={listing.open_house}>
              Open House : { listing.open_house ? "Yes" : "No" }
            </li>
          </ul>
        </div>
        <div className="col-1-of-2">
          <ul className="listingdetail__list">
            <li className="listingdetail__list__item" key={listing.list_date}>Listing Date : {listing.list_date}</li>
            <li className="listingdetail__list__item" key={listing.sqft}>Square Feet : {listing.sqft}</li>
            <li className="listingdetail__list__item" key={listing.address}>Address : {listing.address}</li>
            <li className="listingdetail__list__item" key={listing.city}>City : {listing.city}</li>
            <li className="listingdetail__list__item" key={listing.state}>State : {listing.state}</li>
            <li className="listingdetail__list__item" key={listing.zipcode}>Zipcode : {listing.zipcode}</li>
          </ul>
        </div>
      </div>
      <div className="row">
        <p className="listingdetail__description">{listing.description}</p>
      </div>
      <div className="row">
        { displayInteriorImages() }
      </div>
    </div>
  );
};

export default ListingDetail;