import React from 'react'
import Card from './Card'

const Listings = ({listings}) => {
  const getListings  = () => {
    const listingsOnPage = []
    const results = []

    listings.map(listing => {
      return listingsOnPage.push(
        <Card 
          title={listing.title}
          main_photo={listing.main_photo}
          home_type={listing.home_type}
          sale_type={listing.sale_type}
          sqft={listing.sqft}
          bedrooms={listing.bedrooms}
          bathrooms={listing.bathrooms}
          slug={listing.slug}
          open_house={listing.open_house}
          price={listing.price}
          list_date={listing.list_date}
          address={listing.address}
          city={listing.city}
          state={listing.state}
        />
      )
    })

    for(let listing = 0; listing < listings.length; listing += 3){
      results.push(
        <div className="row">
          <div className="col-1-of-3">
            {listingsOnPage[listing]}
          </div>
          <div className="col-1-of-3">
            {listingsOnPage[listing + 1] ? listingsOnPage[listing + 1] : null}
          </div>
          <div className="col-1-of-3">
            {listingsOnPage[listing + 2] ? listingsOnPage[listing + 2] : null}
          </div>
        </div>
      )
      return results
    }
  }
  return (
    <div>
      {getListings()}
    </div>
  )
}

export default Listings