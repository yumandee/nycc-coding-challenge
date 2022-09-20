import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { logo } from '../assets';

const AtAGlance = ({ openCases, closedCases, topComplaints } ) => {
  return (
    <table className='glance__table'>
      <thead>
        <tr>
          <th> # Open Cases</th>
          <th> # Closed Cases</th>
          <th> Top Complaint Type</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{openCases.length || 0}</td>
          <td>{closedCases.length || 0}</td>
          <td>{topComplaints ? topComplaints[0] : 'None'}</td>
        </tr>
      </tbody>
    </table>
  );
}

const Complaints = ({ complaints }) => {
  return (
    <table className='complaints__table'>
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
            <td>{complaint.opendate || '--'}</td>
            <td>{complaint.closedate || '--'}</td>
            <td>{complaint.complaint_type || '--'}</td>
            <td>{complaint.descriptor || '--'}</td>
            <td>{complaint.account || '--'}</td>
            <td>{complaint.community_board || '--'}</td>
            <td>{complaint.council_dist || '--'}</td>
            <td>{complaint.borough || '--'}</td>
            <td>{complaint.city || '--'}</td>
            <td>{complaint.zip || '--'}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={11}> Showing {complaints.length} of {complaints.length} complaints </td>
        </tr>
      </tfoot>
    </table>
  );
}

const Dashboard = () => {
  const { authToken, logoutUser } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [openCases, setOpenCases] = useState([]);
  const [closedCases, setClosedCases] = useState([]);
  const [topComplaints, setTopComplaints] = useState([]);
  const [mode, setMode] = useState('');

  useEffect(() => {
    fetchFromAPI('', authToken).then((data) => setComplaints(data));
    fetchFromAPI('openCases/', authToken).then((data) => setOpenCases(data));
    fetchFromAPI('closedCases/', authToken).then((data) => setClosedCases(data));
    fetchFromAPI('topComplaints/', authToken).then((data) => setTopComplaints(data));
  }, [authToken])

  const changeData = (mode) => {
    setMode(mode);
    // if the mode is changed to consituents and the data isn't already there, fetch from api.
    fetchFromAPI(`${mode}`, authToken).then((data) => setComplaints(data));
  }
  console.log(complaints);
  return (
    <>
      <div className='glance__container'>
        <div className='logo__div'>
          <img src={logo} className='dashboard__logo' alt='logo' />
        </div>
        <div className='glance__div'>
          <AtAGlance
            openCases={openCases}
            closedCases={closedCases}
            topComplaints={topComplaints}
          />
        </div>
        <div className='btn__div'>
          <button onClick={() => logoutUser()}> Logout </button>
          { mode === '' && <button onClick={() => changeData('constituentComplaints/')}> Complaints by My Constituents </button>}
          { mode === 'constituentComplaints/' && <button  onClick={() => changeData('')}> All District Complaints </button> }
        </div>
      </div>
      <div>
        <div className='complaints__div'>
          <Complaints complaints={complaints} /> 
        </div>
      </div>
    </>
  );
};

export default Dashboard;