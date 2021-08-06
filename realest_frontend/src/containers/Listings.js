import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Card from '../components/Card';
import Pagination from '../components/Pagination';

const Listings = () => {
  const [count, setCount] = useState(0);
  const [listings, setListings] = useState([]);
  const [previous, setPrevious] = useState('');
  const [next, setNext] = useState('');
  const [active, setActive] = useState(1);

  useEffect(() => {
    window.scrollTo(0,0);

    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/listings/?page=1');
        setListings(res.data.results);
        setPrevious(res.data.previous);
        setNext(res.data.next);
        setCount(res.data.count);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  const displayListings = () => {
    let result = [];
    let display = [];

    listings.map(listing => {
      return display.push(
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
    });

    for(let index = 0; index < listings.length; index += 3){
      result.push(
        <div className="row" key={index} >
          <div className="col-1-of-3">
            {display[index]}
          </div>
          <div className="col-1-of-3">
            {display[index+1] ? display[index+1] : null}
          </div>
          <div className="col-1-of-3">
            {display[index+2] ? display[index+2] : null}
          </div>
        </div>
      )
    }

    return result;
  }

  const visitPage = (page) => {
    axios.get(`http://localhost:8000/api/listings/?page=${page}`)
    .then(res => {
      setListings(res.data.results);
      setNext(res.data.next);
      setPrevious(res.data.previous);
      setActive(page);
    }).catch (err => {
      console.log(err);
    })
  }

  const prev_number = () => {
    axios.get(previous)
    .then(res => {
      setListings(res.data.results);
      setNext(res.data.next);
      setPrevious(res.data.previous);
      if(previous)
        setActive(active-1);
    }).catch (err => {
      console.log(err);
    })
  }

  const next_number = () => {
    axios.get(next)
    .then(res => {
      setListings(res.data.results);
      setNext(res.data.next);
      setPrevious(res.data.previous);
      if(next)
        setActive(active+1);
    }).catch (err => {
      console.log(err);
    })
  }

  return (
    <main className="listings">
      <Helmet>
        <title>Listings - Find your dream property on Real Estate</title>
        <meta name="description" content="Browse through listings of property in your locations with contact details of realtors on Real Estate." />
      </Helmet>
      <section className="listings__listings">
        { displayListings() }
      </section>
      <section className="listings__pagination">
        <div className="row">
          { listings.length !== 0 ? (
            <Pagination 
              itemsPerPage={3}
              count={count}
              previous={prev_number}
              next={next_number}
              active={active}
              setActive={setActive}
              visitPage={visitPage} 
            />
          ) : null }
        </div>
      </section>
    </main>
  );
};

export default Listings;