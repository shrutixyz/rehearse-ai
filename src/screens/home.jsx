import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {

    function callGeminiAPI()
    {
        axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        {
            "contents": [{
              "parts":[{"text": "Give me python code to sort a list."}]
              }]
        }
        )
        .then(function (response) {
            console.log(response.data)
        })
    }
    return (
        <div>Home</div>
    )
}

export default Home