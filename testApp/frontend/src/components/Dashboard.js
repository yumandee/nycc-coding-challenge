import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const AtAGlance = ({ openCases, closedCases, topComplaints } ) => {
  console.log("From at a glance: ", openCases);
  return (
    <table>
      <tbody>

        <tr>
          <th> # Open Cases</th>
          <td>{openCases.length || 0}</td>
        </tr>
        <tr>
          <th> # Closed Cases</th>
          <td>{closedCases.length || 0}</td>
        </tr>
        <tr>
          <th> Top Complaint Type</th>
          <td>{topComplaints ? topComplaints[0] : 'None'}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Complaints = ({ complaints }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Key</th>
          <th>Open Date</th>
          <th>Close Date</th>
          <th>Complaint Type</th>
          <th>Descriptor</th>
          <th>Account</th>
          <th>Community Board</th>
          <th>Council District</th>
          <th>Borough</th>
          <th>City</th>
          <th>Zip</th>
        </tr>
      </thead>
      <tbody>
        {complaints.map((complaint) => (
          <tr key={complaint.unique_key}>
            <td>{complaint.unique_key}</td>
            <td>{complaint.opendate}</td>
            <td>{complaint.closedate || '--'}</td>
            <td>{complaint.complaint_type}</td>
            <td>{complaint.descriptor || '--'}</td>
            <td>{complaint.account}</td>
            <td>{complaint.community_board}</td>
            <td>{complaint.council_dist}</td>
            <td>{complaint.borough}</td>
            <td>{complaint.city}</td>
            <td>{complaint.zip}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const Dashboard = () => {
  const { authToken, logoutUser } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [openCases, setOpenCases] = useState([]);
  const [closedCases, setClosedCases] = useState([]);
  const [topComplaints, setTopComplaints] = useState([]);

  useEffect(() => {
    fetchFromAPI('', authToken).then((data) => setComplaints(data));
    fetchFromAPI('openCases/', authToken).then((data) => setOpenCases(data));
    fetchFromAPI('closedCases/', authToken).then((data) => setClosedCases(data));
    fetchFromAPI('topComplaints/', authToken).then((data) => setTopComplaints(data));
  }, [authToken])


  console.log('Complaints:', complaints);
  console.log('Open cases:', openCases);
  console.log('Closed cases', closedCases);
  console.log('Top complaints:', topComplaints);
  return (
    <>
      <button onClick={() => logoutUser() }>
        Logout
      </button>
      <section>
        <div>
          <AtAGlance openCases={openCases} closedCases={closedCases} topComplaints={topComplaints} />
        </div>
      </section>
      <section>
        <div>
          <Complaints complaints={complaints} />
        </div>
      </section>
    </>
  );
};

export default Dashboard;