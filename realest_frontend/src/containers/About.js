import React, { useState, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import House from '../assets/images/bg.jpg';

const About = () => {
  const [topSeller, setTopSeller] = useState([])
  const [realtors,setRealtors] = useState([])
  
  useEffect(() => {
    axios.defaults.headers = {
      "Content-Type": "application/json"
    }

    const getTopSeller = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/realtors/topseller')
        setTopSeller(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    getTopSeller()

  },[])

  useEffect(() => {
    axios.defaults.headers = {
      "Content-Type": "application/json"
    }
    const getRealtors = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/realtors/')
        setRealtors(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    getRealtors()

  },[])

  const getAllRealtors = () => {
    let allRealtors = []
    let results = []

    realtors.map(realtor => {
      return allRealtors.push(
        <Fragment key={realtor.id} >
          <div className="about__display">
            <img src={realtor.photo} className="about__display__image" alt="realtor" />
          </div>
          <h3 className="about__realtor">{realtor.name}</h3>
          <p className="about__contact">{realtor.phone}</p>
          <p className="about__contact">{realtor.email}</p>
          <p className="about__about">{realtor.description}</p>
        </Fragment>
      )
    })

    for(let i = 0; i < allRealtors.length; i += 4) {
      results.push(
        <div className="row" key={i}>
          <div className="col-1-of-4">
            { allRealtors[i] ? (allRealtors[i]) : null }
          </div>
          <div className="col-1-of-4">
            { allRealtors[i+1] ? (allRealtors[i+1]) : null }
          </div>
          <div className="col-1-of-4">
            { allRealtors[i+2] ? (allRealtors[i+2]) : null }
          </div>
          <div className="col-1-of-4">
            { allRealtors[i+3] ? (allRealtors[i+3]) : null }
          </div>
        </div>
      )
    }

    return results
  }

  const getTopSeller = () => {
    let results = []

    topSeller.map(seller => {
      return results.push(
        <Fragment key={seller.id} >
          <div className="about__topseller__col">
            <div className="about__display">
              <img src={seller.photo} className="about__display__image" alt="realtor" />
            </div>
            <h3 className="about__topseller">Top Seller</h3>
            <p className="about__realtor">{seller.name}</p>
            <p className="about__contact">{seller.phone}</p>
            <p className="about__contact">{seller.email}</p>
            <p className="about__about">{seller.description}</p>
          </div>
        </Fragment>
      )
    })

    return results;
  }

  return (
    <main className="about">
      <Helmet>
        <title>Real Estate | About Us</title>
        <meta name="description" content="Real Estate is the leading site for providing properties to the people. We have over 100+ realtors to help our customer finding best homes in their own budget." />
      </Helmet>

      <div className="about__header">
        <h1 className="about__heading">
          About Real Estate 
        </h1>
      </div>
      <section className="about__info">
        <div className="row">
          <div className="col-3-of-4">
            <h2 className="about__subheading">We find you the best home for your needs.</h2>
            <p className="about__paragraph about__paragraph__1">
              Real estate is property consisting of land and the buildings on it, along with its natural resources such as crops, minerals or water; immovable property of this nature; an interest vested in this an item of real property, buildings or housing in general.
            </p>
            <div className="about__display about__display__main">
              <img src={House} alt="Dream Home" className="about__display__image" />
            </div>
            <p className="about__paragraph about__paragraph__2">
              The real estate industry encompasses the many facets of property, including development, appraisal, marketing, selling, leasing, and management of commercial, industrial, residential, and agricultural properties. This industry can fluctuate depending on the national and local economies, although it remains somewhat consistent due to the fact that people always need homes and businesses always need office space.<br/><br/>
              Real estate is property consisting of land and the buildings on it, along with its natural resources such as crops, minerals or water; immovable property of this nature; an interest vested in this an item of real property, buildings or housing in general.
            </p>
          </div>
          <div className="col-1-of-4">
            { getTopSeller() }
          </div>
        </div>
      </section>
      <section className="about__team">
        <div className="row">
          <h2 className="about__subheading">Meet our awesome team</h2>
        </div>
        { getAllRealtors() }
      </section>
    </main>
  );
};

export default About;