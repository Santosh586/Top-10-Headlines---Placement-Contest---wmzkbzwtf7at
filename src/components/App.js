import React, { useState, useEffect } from 'react'
import '../styles/App.css';

const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
 const API_KEY="b9eea9ddd4dbb47bf0bb1dfc76109bda";

 const changeFunction=(e)=>
 {
  setCategory(e.target.value);
 }
 useEffect(()=>
 {
   setLoading(true);
   fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${API_KEY}`).then(res=>res.json())
   .then((res)=>{
    setNewsData(res.articles)
    console.log(res);
  }).then(()=>setLoading(false));
 },[category])
  return (
    <div id="main">
      <h1 className='heading'>Top 10 {category} news.</h1>
      <select value={category} onChange={changeFunction}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      {loading && <p className='loader'>Loading...</p>}
      {!loading &&<ol>
       { newsData.map((e,i)=>
        {
          return (<li key={i}>
          <img className='news-img' src={e.image} alt=""/>
          <section className='new-title-content-author'>
            <h3 className='news-title'>{e.title}</h3>
            <section className='new-content-author'>
              <p className='news-description'>{e.description}</p>
              <p className='news-source'><strong>Source:</strong>{e.source.name}</p>
            </section>
          </section>
        </li>)
        })
      }
      </ol>}
    </div>
  )
}


export default App;