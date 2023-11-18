import React, { useState} from 'react';
import Navbar from '../components/Navbar'
import CreatePoll from '../components/CreatePoll';
function News() {
    return(
        <>
        <Navbar/>
            <h1>Nesw</h1>
            <CreatePoll></CreatePoll>
        </>
    )
}

export default News;