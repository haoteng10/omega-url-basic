import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const WEBSITES = gql`
    query GetWebsitesQuery
    {
        websites {
            id,
            name,
            slug,
            url
        }
    }
`;

function WebsiteList() {
    const { loading, error, data } = useQuery(WEBSITES);
    // const [ websites, setWebsites] = useState(null);


    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <ul id="website-list">
                { data.websites ? data.websites.map((website) => <li>{website.name}</li>) : null}
            </ul>
        </div>
    )
}

export default WebsiteList;